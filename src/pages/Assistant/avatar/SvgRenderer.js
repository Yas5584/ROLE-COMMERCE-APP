
import { AvatarRenderer } from './AvatarRenderer'
export class SvgRenderer extends AvatarRenderer{
  constructor(){ super(); this.mouth=null }
  async init(container){
    container.innerHTML='<svg width="96" height="96" viewBox="0 0 96 96"><circle cx="48" cy="48" r="46" fill="#FFE7D6" stroke="#333"/><circle cx="34" cy="42" r="6" fill="#333"/><circle cx="62" cy="42" r="6" fill="#333"/><rect id="mouth" x="30" y="60" width="36" height="6" rx="3" fill="#333"/></svg>'
    this.mouth=container.querySelector('#mouth')
  }
  _setTalking(t){ if(this.mouth){ this.mouth.setAttribute('height',t?'16':'6'); this.mouth.setAttribute('y',t?'56':'60') } }
  async say(text,{locale}={}){
    if(!('speechSynthesis' in window)) return
    if(speechSynthesis.getVoices().length===0){
      await new Promise(r=>{speechSynthesis.onvoiceschanged=r})
    }
    const u=new SpeechSynthesisUtterance(text)
    if(locale) u.lang=locale
    u.onstart=()=>this._setTalking(true)
    u.onend=()=>this._setTalking(false)
    speechSynthesis.speak(u)
  }
  async stop(){ speechSynthesis.cancel(); this._setTalking(false) }
  async destroy(){ await this.stop() }
}
