import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

const handleApiCall = async (request, onSuccess, onError, onFinally) => {
    try {
        const response = await request();
        if ( onSuccess ) onSuccess(response.data);
    } catch (e) {
        if (onError) onError(e);
    } finally {
        if (onFinally) onFinally();
    }
}

const saveReview = (reviewData, onSuccess, onError, onFinally) => {
    handleApiCall(() => api.post('/api/review/saveReview', reviewData), onSuccess, onError, onFinally);
}
const deleteReview = (id, onSuccess, onError, onFinally) => {
    handleApiCall(() => api.delete(`/api/review/deleteReview`, { params: { id } }), onSuccess, onError, onFinally);
};

export { saveReview, deleteReview };