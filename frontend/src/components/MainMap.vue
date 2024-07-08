<template>
  <div class="main-map" ref="map">
  </div>
  <div>
    <p>리뷰 목록:</p>
    <ul>
      <li v-for="review in reviews" :key="review.id">{{ review.title }}</li>
    </ul>
    <button @click="fetchReviews">리뷰 불러오기</button>
  </div>
</template>

<script>
import OlLayerTile from 'ol/layer/Tile';
import OlView from 'ol/View';
import OlMap from 'ol/Map';
import OSM from 'ol/source/OSM';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlStyle from 'ol/style/Style'
import OlIcon from 'ol/style/Icon'
import {fromLonLat, toLonLat} from 'ol/proj'
import {defaults} from 'ol/control';

import Geocoder from 'ol-geocoder'

//pinia
import { mapActions, mapState } from 'pinia';
import { useReviewStore } from '@/store';

import axios from "axios";
import { inject } from 'vue';

// 위치 표시
import OlVectorSource from 'ol/source/Vector'
import OlVectorLayer from 'ol/layer/Vector'
const EPSG_3857 = 'EPSG:3857';

export default {
  name: 'MainMap',
  data() {
    return {
      olMap: undefined,
      vectorSource: new OlVectorSource(EPSG_3857),
      geocoder: new Geocoder('nominatim', {
        provider: 'osm',
        lang: 'kr',
        placeholder: '주소 검색',
        limit: 8,
        autoComplete: true,
        keepOpen: true
      }),
      iconsSource: undefined
    }
  },
  computed: {
    ...mapState(useReviewStore, ['reviews'])
  },
  async mounted() {
    const vectorLayer = new OlVectorLayer({
      source: this.vectorSource
    })
    this.olMap = new OlMap({
      target: this.$refs.map,
      controls : defaults({
        attribution : false,
        zoom : false,
        rotate: false,
      }),
      layers: [
        new OlLayerTile({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new OlView({
        center: fromLonLat([126.9780, 37.5665]),
        zoom: 11,
        projection: EPSG_3857
      })
    })
    await this.setReviews();
    this.olMap.on('click', async (e) => {
      await this.addUiAddress(e);
      this.drawMapIcon(e);

      const lonLatArr = toLonLat(e.coordinate);
      useReviewStore().setLonLat(lonLatArr[0], lonLatArr[1]);
    });
    this.olMap.addControl(this.geocoder);

    this.geocoder.on('addresschosen', (evt) => {
      this.setUiAddress(evt.address.details.name);
    });
  },
  methods: {
    getAddress (lon, lat) {
      return axios.get(
          'https://nominatim.openstreetmap.org/reverse',
          {
            params: {
              format: 'json',
              lon: lon,
              lat: lat
            }
          }
      )
    },
    setUiAddress(str) {
      this.globalMessage = str.split(', ').reverse().join(' ');
    },
    async addUiAddress(e) {
      const lonLatArr = toLonLat(e.coordinate);
      const lon = lonLatArr[0]
      const lat = lonLatArr[1]

      const addressInfo = await this.getAddress(lon, lat)
      this.globalMessage = addressInfo.data.display_name.split(', ').reverse().join(' ');
    },
    drawMapIcon(e) {
      this.vectorSource.clear();
      this.geocoder.getSource().clear();
      const feature = new OlFeature({
        geometry: new OlPoint(e.coordinate)
      })
      feature.setStyle(new OlStyle({
        image: new OlIcon({
          scale: 0.6,
          displacement: [0, 15],
          src: '//cdn.rawgit.com/jonataswalker/map-utils/master/images/marker.png'
        })
      }))
      this.vectorSource.addFeature(feature);
    },
    ...mapActions(useReviewStore, ['setReviews']),
    async fetchReviews() {
      await this.setReviews();
    },
    drawFeatures() {
      if (this.iconsSource) this.iconsSource.clear();
      this.iconsSource = new OlVectorSource(EPSG_3857);
      const iconsLayer = new OlVectorLayer({
        source: this.iconsSource
      });
      const style = new OlStyle({
        image: new OlIcon({
          scale: 0.8,
          src: require('@/assets/images/spot.png')
        })
      });
    }
  },
  setup() {
    const globalMessage = inject('globalMessage');
    return {
      globalMessage
    }
  }
}
</script>

<style scoped>
.main-map {
  width: 100%;
  height: 100%;
}
:deep(.ol-geocoder) {
  position: absolute;
  right: 0;
  padding: 10px;
}
:deep(.ol-geocoder button) {
  display: none;
}
:deep(.ol-geocoder input::placeholder) {
  color: white;
  opacity: 0.7;
}
:deep(.ol-geocoder input), :deep(.ol-geocoder ul) {
  border-style: none;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  border-color: unset;
  padding: 0 5px;
  color: white;
}
:deep(.ol-geocoder ul) {
  margin-top: 5px;
  padding: 0;
  list-style: none;
}
:deep(.ol-geocoder ul li) {
  padding: 5px 10px;
  font-size: 13px;
}
:deep(.ol-geocoder ul li:hover) {
  background-color: rgba(0, 0, 0, 0.3);
}
:deep(a) {
  text-decoration: none;
  color: white
}
</style>