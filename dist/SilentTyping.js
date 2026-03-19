/**
 * @name UsernameSpoof
 * @version 1.0.0
 * @description Spoofs your username locally
 */
var i=require("@enmity/metro"),l=require("@enmity/patcher");const a="awesomepvpcat_destroyerofworldz",s="firefox";var m={name:"UsernameSpoof",version:"1.0.0",description:"Spoofs your username locally",onStart(){const r=i.getByProps("getCurrentUser","getUser");this.unpatch1=l.after(r,"getCurrentUser",(o,u,e)=>{var t,n;if(e)return((t=e.username)==null?void 0:t.toLowerCase())===s.toLowerCase()||((n=e.globalName)==null?void 0:n.toLowerCase())===s.toLowerCase()?{...e,username:a,globalName:a}:e}),this.unpatch2=l.after(r,"getUser",(o,u,e)=>{var t;if(e)return((t=e.username)==null?void 0:t.toLowerCase())===s.toLowerCase()?{...e,username:a,globalName:a}:e})},onStop(){var r,o;(r=this.unpatch1)==null||r.call(this),(o=this.unpatch2)==null||o.call(this)}};module.exports=m;
