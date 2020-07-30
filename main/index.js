import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
import './index.less';

// for angular subapp
import 'zone.js';

/**
 * 主应用 **可以使用任意技术栈**
 * 以下分别是 React 和 Vue 的示例，可切换尝试
 */
import render from './render/ReactRender';
// import render from './render/VueRender';

/**
 * Step1 初始化应用（可选）
 */
render({ loading: false });

const loader = (loading) => render({ loading });

/**
 * Step2 注册子应用
 */

registerMicroApps(
	[
		{
			name: 'thirdPage',
			entry: 'https://sz-p.com/boardItem/canvas-img-roll/build/index.html',
			container: '#subapp-viewport',
			loader,
			activeRule: '/thirdPage'
		},
		{
			name: 'cra',
			entry: './create-react-app/index.html',
			container: '#subapp-viewport',
			loader,
			activeRule: '/cra'
		},
		{
			name: 'pureHTMLWithEntry',
			entry: '//localhost:3001',
			container: '#subapp-viewport',
			loader,
			activeRule: '/pureHTMLWithEntry'
		},
		{
			name: 'pureHTMLWithOutEntry',
			entry: '//localhost:3002',
			container: '#subapp-viewport',
			loader,
			activeRule: '/pureHTMLWithOutEntry'
		}
	],
	{
		beforeLoad: [
			(app) => {
				console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
			}
		],
		beforeMount: [
			(app) => {
				console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
			}
		],
		afterUnmount: [
			(app) => {
				console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
			}
		]
	}
);

const { onGlobalStateChange, setGlobalState } = initGlobalState({
	user: 'qiankun'
});

onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - master]:', value, prev));

setGlobalState({
	ignore: 'master',
	user: {
		name: 'master'
	}
});

/**
 * Step3 设置默认进入的子应用
 */

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
	console.log('[MainApp] first app mounted');
});
