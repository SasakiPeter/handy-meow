<template>
	<div id="app">
		<v-toolbar>
			<v-toolbar-title>
				<!-- <v-img src="../assets/logo.png" aspect-ratio="1.0"></v-img> -->
				<h1>
					<img src="../assets/logo.png" alt="HandyMeow">
				</h1>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<!-- <v-btn flat>{{userData.displayName}}</v-btn> -->
				<v-btn flat @click="logout">ログアウト</v-btn>
			</v-toolbar-items>
		</v-toolbar>
		<v-content>
			<v-container fluid>
				<Home v-if="!isLogin" />
				<Editor v-if="isLogin" :user="userData" />
			</v-container>
		</v-content>
		<v-footer>
			<router-link :to="{name:'terms'}">利用規約</router-link>
		</v-footer>
	</div>
</template>

<script>
import Home from '../components/Home';
import Editor from '../components/Editor';
import { default as firebase } from '../main';
require('dotenv').config();

export default {
	// name: "app",
	data() {
		return {
			isLogin: false,
			userData: null
		};
	},
	components: {
		// Home:Homeなんて記述するのは面倒
		Home,
		Editor
	},
	// createdはコンポーネントが作成されたタイミングで呼ばれる
	created: function() {
		// この画面遷移処理が終わるまで少しかかるので、ローディング画面を実装したい
		firebase.auth().onAuthStateChanged(user => {
			// console.log(user);
			if (user) {
				this.isLogin = true;
				this.userData = user;
			} else {
				this.isLogin = false;
				this.userData = null;
			}
		});
	},
	methods: {
		logout: function() {
			firebase.auth().signOut();
		}
	}
};
</script>

