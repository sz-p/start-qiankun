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

const createMicroApps = function() {
	const conf = window.subConfig;
	let microApps = [];
	for (let i = 0; i < conf.length; i++) {
		microApps.push({
			name: conf[i].name,
			entry: conf[i].entry,
			activeRule: conf[i].activeRule,
			loader,
			container: '#subapp-viewport'
		});
	}
	return microApps
};
/**
 * Step2 注册子应用
 */

registerMicroApps(createMicroApps(), {
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
});

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
