<template>
	<!-- css当てる際に適宜idやclassを与えればいいと思う -->
	<article>
		<h2>Welcome to HandyMeow!</h2>
		<v-btn color="info" @click="googleLogin">Googleアカウントでログイン</v-btn>
	</article>
</template>

<script>
// import { default as firebase } from '../firebase/firestore.js';
import { default as firebase, provider } from '../main';

export default {
	data() {
		return {
			msg: 'こんにちは世界'
		};
	},
	// 認証が終わり、user情報の変更がTop.vueで検知されるまでロード画面に遷移したい
	// redux saga的なやつな
	methods: {
		googleLogin: function() {
			firebase.auth().signInWithRedirect(provider);
		}
	}
};
</script>
