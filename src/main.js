import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false;

const config = {
	apiKey: process.env.VUE_APP_FB_apiKey,
	authDomain: 'handy-meow.firebaseapp.com',
	databaseURL: 'https://handy-meow.firebaseio.com',
	projectId: 'handy-meow',
	storageBucket: 'handy-meow.appspot.com',
	messagingSenderId: '494866792215'
};

export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
	router: router,
	render: h => h(App)
}).$mount('#app');
