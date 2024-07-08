<template>
  <div class="side-bar-wrapper">
    <VueResizable
        class="resizable-side-bar"
        :width="500"
        :min-width="500"
        :max-width="Infinity"
        :active="['r']"
        v-if="isVisibleSideBar"
    >
      <div class="side-bar p-3">
        <div class="title-area">
          <input v-model="title" placeholder="맛집 이름을 입력해주세요."/>
        </div>
        <div class="image-area">
          <div class="iw-file-input">
            사진을 업로드 해주세요
          </div>
        </div>
        <div class="location-info-area d-flex align-items-start my-2">
          <i class="bi bi-geo-alt"></i>
          <textarea v-model="selectedAdd" class="ms-2" placeholder="위치 정보 직접 입력하기"/>
        </div>
        <div class="rate-box">
          <select class="form-select form-select-lg mb-3" v-model="grade">
            <option value="" disabled>맛집 점수 선택</option>
            <option value="1">웩🤐</option>
            <option value="2">쏘쏘🙄</option>
            <option value="3">냠😋</option>
            <option value="4">쩝쩝박사😍</option>
          </select>
        </div>
        <div class="review-area">
          <textarea
              v-model="review"
              placeholder="후기를 입력해주세요."
          />
        </div>
        <div class="d-grid mt-2">
          <button class="btn btn-dark" @click="saveReview">
            저장
          </button>
        </div>
      </div>
    </VueResizable>
    <button type="button" class="side-bar-active-btn btn btn-outline-secondary" @click="showSideBar">
      {{ isVisibleSideBar ? '닫힘' : '열림' }}
    </button>
    <ProgressSpinner v-if="loading" />
  </div>
</template>

<script setup>
import VueResizable from 'vue-resizable';
import {ref, inject, computed } from "vue";
import ProgressSpinner from "@/components/ProgressSpinner.vue";
import { saveReview as apiSaveReview } from '@/common/Api';
import { useReviewStore } from '@/store';

const title = ref('');
const grade = ref('');
const review = ref('');
const loading = ref(false);
const isVisibleSideBar = ref(true);

const reviewStore = useReviewStore();

const resetFields = () => {
  title.value = '';
  selectedAdd.value = '';
  grade.value = '';
  review.value = '';
};

const showSideBar = () => isVisibleSideBar.value = !isVisibleSideBar.value;

const globalMessage = inject('globalMessage');
const selectedAdd = computed(() => globalMessage.value);

const saveReview = async () => {
  loading.value = true;

  const reviewData = {
    title: title.value,
    address: selectedAdd.value,
    grade: grade.value,
    review: review.value,
    lon: reviewStore.curLon,
    lat: reviewStore.curLat
  };

  await apiSaveReview(
      reviewData,
      (data) => {
        console.log("Review saved successfully:", data);
        alert("저장 완료되었습니다.");
      },
      (error) => {
        console.error("There was an error saving the review:", error);
      },
      () => {
        loading.value = false;
        resetFields();
      }
  );
}
</script>

<style scoped>
input::placeholder, textarea::placeholder {
  color: white;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #888;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
.side-bar-wrapper {
  display: flex;
  color: #fff;
  .resizable-side-bar {
    .side-bar {
      background-color: rgba(0, 0, 0, 0.5);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .title-area {
        input {
          font-size: 2rem;
          font-weight: bold;
          color: white;
          box-shadow: none;
          background: none;
          border: none;
          width: 100%;
        }
      }
      .image-area {
        .iw-file-input {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.3rem;
          border: 5px dashed rgb(255, 255, 255, 0.5);
          border-radius: 10px;
          height: 250px;
          background-color: rgb(255, 255, 255, 0.5);
        }
      }
      .location-info-area {
        textarea {
          font-size: 1rem;
          color: #fff;
          box-shadow: none;
          background: none;
          border: none;
          resize: none;
          overflow-wrap: break-word;
          width: 100%;
          height: 30px;
        }
      }
      .rate-box {
        select {
          border: 5px dashed rgb(255, 255, 255, 0.5);
          background-color: rgb(255, 255, 255, 0.5);
        }
      }
      .review-area {
        textarea {
          min-height: 300px;
          width: 100%;
          resize: none;
          box-shadow: none;
          padding: 10px;
          background-color: rgb(255, 255, 255, 0.5);
          border-radius: 5px;
        }
      }
    }
  }
}
.side-bar-active-btn {
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000000;
  padding: 0;
  border: none;
  border-radius: unset;
  color: #fff;
  opacity: 0.5;
  width: 40px;
  height: 40px;
}
</style>