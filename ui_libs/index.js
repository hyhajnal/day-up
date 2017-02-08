/*export { default as Popup } from './package/Popup'*/

import Popup from './package/Popup'
import Dialog from './package/Dialog'

export default function install(Vue) {
	Vue.component(Popup.name, Popup)
	Vue.component(Dialog.name, Dialog)
}