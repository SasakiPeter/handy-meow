import Vue from 'vue';
import Router from 'vue-router';
import Top from '../views/Top';
import Terms from '../views/Terms';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'top',
			component: Top
		},
		{
			path: '/terms',
			name: 'terms',
			component: Terms
		}
	]
});
