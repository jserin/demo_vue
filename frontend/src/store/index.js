import { defineStore } from 'pinia';
import axios from "axios";

export const useReviewStore = defineStore('review', {
    state: () => ({
        reviews: undefined,
        curLon: undefined,
        curLat: undefined,
        curReviewId: undefined,
        curTitle: undefined,
        curAddress: undefined,
        curGrade: undefined,
        curReview: undefined,
    }),
    actions: {
        async setReviews() {
            try {
                const result = await axios.get('/api/review/getReviews');
                this.reviews = result.data;
            } catch (error) {
                console.error('There was an error fetching the reviews:', error);
            }
        },
        setReview(review) {
            this.curReviewId = review ? review.id : review;
            this.curLat = review ? review.lat : review;
            this.curLon = review ? review.lon : review;
            this.curTitle = review ? review.title : review;
            this.curGrade = review ? review.grade : review;
            this.curAddress = review ? review.address : review;
            this.curReview = review ? review.review : review;
        },
        setLonLat(lon, lat) {
            this.curLon = lon;
            this.curLat = lat;
        },
        setCurReviewId(id) {
            this.curReviewId = id;
        },
        setCurTitle(title) {
            this.curTitle = title;
        },
        setCurAddress(address) {
            this.curAddress = address;
        },
        setCurGrade(grade) {
            this.curGrade = grade;
        },
        setCurReview(review) {
            this.curReview = review;
        }
    }
});