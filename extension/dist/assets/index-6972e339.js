(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const _ of document.querySelectorAll('link[rel="modulepreload"]'))r(_);new MutationObserver(_=>{for(const i of _)if(i.type==="childList")for(const s of i.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function n(_){const i={};return _.integrity&&(i.integrity=_.integrity),_.referrerPolicy&&(i.referrerPolicy=_.referrerPolicy),_.crossOrigin==="use-credentials"?i.credentials="include":_.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(_){if(_.ep)return;_.ep=!0;const i=n(_);fetch(_.href,i)}})();var K,a,$e,H,ue,Se,ne,R={},xe=[],ze=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i;function x(t,e){for(var n in e)t[n]=e[n];return t}function Ce(t){var e=t.parentNode;e&&e.removeChild(t)}function Ge(t,e,n){var r,_,i,s={};for(i in e)i=="key"?r=e[i]:i=="ref"?_=e[i]:s[i]=e[i];if(arguments.length>2&&(s.children=arguments.length>3?K.call(arguments,2):n),typeof t=="function"&&t.defaultProps!=null)for(i in t.defaultProps)s[i]===void 0&&(s[i]=t.defaultProps[i]);return W(t,s,r,_,null)}function W(t,e,n,r,_){var i={type:t,props:e,key:n,ref:r,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:_??++$e};return _==null&&a.vnode!=null&&a.vnode(i),i}function Q(t){return t.children}function T(t,e){this.props=t,this.context=e}function U(t,e){if(e==null)return t.__?U(t.__,t.__.__k.indexOf(t)+1):null;for(var n;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null)return n.__e;return typeof t.type=="function"?U(t):null}function He(t){var e,n;if((t=t.__)!=null&&t.__c!=null){for(t.__e=t.__c.base=null,e=0;e<t.__k.length;e++)if((n=t.__k[e])!=null&&n.__e!=null){t.__e=t.__c.base=n.__e;break}return He(t)}}function ae(t){(!t.__d&&(t.__d=!0)&&H.push(t)&&!z.__r++||ue!==a.debounceRendering)&&((ue=a.debounceRendering)||Se)(z)}function z(){var t,e,n,r,_,i,s,u;for(H.sort(ne);t=H.shift();)t.__d&&(e=H.length,r=void 0,_=void 0,s=(i=(n=t).__v).__e,(u=n.__P)&&(r=[],(_=x({},i)).__v=i.__v+1,_e(u,i,_,n.__n,u.ownerSVGElement!==void 0,i.__h!=null?[s]:null,r,s??U(i),i.__h),Te(r,i),i.__e!=s&&He(i)),H.length>e&&H.sort(ne));z.__r=0}function Pe(t,e,n,r,_,i,s,u,h,c){var o,p,l,f,d,w,m,g=r&&r.__k||xe,S=g.length;for(n.__k=[],o=0;o<e.length;o++)if((f=n.__k[o]=(f=e[o])==null||typeof f=="boolean"||typeof f=="function"?null:typeof f=="string"||typeof f=="number"||typeof f=="bigint"?W(null,f,null,null,f):Array.isArray(f)?W(Q,{children:f},null,null,null):f.__b>0?W(f.type,f.props,f.key,f.ref?f.ref:null,f.__v):f)!=null){if(f.__=n,f.__b=n.__b+1,(l=g[o])===null||l&&f.key==l.key&&f.type===l.type)g[o]=void 0;else for(p=0;p<S;p++){if((l=g[p])&&f.key==l.key&&f.type===l.type){g[p]=void 0;break}l=null}_e(t,f,l=l||R,_,i,s,u,h,c),d=f.__e,(p=f.ref)&&l.ref!=p&&(m||(m=[]),l.ref&&m.push(l.ref,null,f),m.push(p,f.__c||d,f)),d!=null?(w==null&&(w=d),typeof f.type=="function"&&f.__k===l.__k?f.__d=h=Ee(f,h,t):h=Le(t,f,l,g,d,h),typeof n.type=="function"&&(n.__d=h)):h&&l.__e==h&&h.parentNode!=t&&(h=U(l))}for(n.__e=w,o=S;o--;)g[o]!=null&&(typeof n.type=="function"&&g[o].__e!=null&&g[o].__e==n.__d&&(n.__d=Ne(r).nextSibling),Ue(g[o],g[o]));if(m)for(o=0;o<m.length;o++)Ae(m[o],m[++o],m[++o])}function Ee(t,e,n){for(var r,_=t.__k,i=0;_&&i<_.length;i++)(r=_[i])&&(r.__=t,e=typeof r.type=="function"?Ee(r,e,n):Le(n,r,r,_,r.__e,e));return e}function Le(t,e,n,r,_,i){var s,u,h;if(e.__d!==void 0)s=e.__d,e.__d=void 0;else if(n==null||_!=i||_.parentNode==null)e:if(i==null||i.parentNode!==t)t.appendChild(_),s=null;else{for(u=i,h=0;(u=u.nextSibling)&&h<r.length;h+=1)if(u==_)break e;t.insertBefore(_,i),s=i}return s!==void 0?s:_.nextSibling}function Ne(t){var e,n,r;if(t.type==null||typeof t.type=="string")return t.__e;if(t.__k){for(e=t.__k.length-1;e>=0;e--)if((n=t.__k[e])&&(r=Ne(n)))return r}return null}function Je(t,e,n,r,_){var i;for(i in n)i==="children"||i==="key"||i in e||G(t,i,null,n[i],r);for(i in e)_&&typeof e[i]!="function"||i==="children"||i==="key"||i==="value"||i==="checked"||n[i]===e[i]||G(t,i,e[i],n[i],r)}function he(t,e,n){e[0]==="-"?t.setProperty(e,n??""):t[e]=n==null?"":typeof n!="number"||ze.test(e)?n:n+"px"}function G(t,e,n,r,_){var i;e:if(e==="style")if(typeof n=="string")t.style.cssText=n;else{if(typeof r=="string"&&(t.style.cssText=r=""),r)for(e in r)n&&e in n||he(t.style,e,"");if(n)for(e in n)r&&n[e]===r[e]||he(t.style,e,n[e])}else if(e[0]==="o"&&e[1]==="n")i=e!==(e=e.replace(/Capture$/,"")),e=e.toLowerCase()in t?e.toLowerCase().slice(2):e.slice(2),t.l||(t.l={}),t.l[e+i]=n,n?r||t.addEventListener(e,i?pe:de,i):t.removeEventListener(e,i?pe:de,i);else if(e!=="dangerouslySetInnerHTML"){if(_)e=e.replace(/xlink(H|:h)/,"h").replace(/sName$/,"s");else if(e!=="width"&&e!=="height"&&e!=="href"&&e!=="list"&&e!=="form"&&e!=="tabIndex"&&e!=="download"&&e in t)try{t[e]=n??"";break e}catch{}typeof n=="function"||(n==null||n===!1&&e[4]!=="-"?t.removeAttribute(e):t.setAttribute(e,n))}}function de(t){return this.l[t.type+!1](a.event?a.event(t):t)}function pe(t){return this.l[t.type+!0](a.event?a.event(t):t)}function _e(t,e,n,r,_,i,s,u,h){var c,o,p,l,f,d,w,m,g,S,O,L,le,F,j,$=e.type;if(e.constructor!==void 0)return null;n.__h!=null&&(h=n.__h,u=e.__e=n.__e,e.__h=null,i=[u]),(c=a.__b)&&c(e);try{e:if(typeof $=="function"){if(m=e.props,g=(c=$.contextType)&&r[c.__c],S=c?g?g.props.value:c.__:r,n.__c?w=(o=e.__c=n.__c).__=o.__E:("prototype"in $&&$.prototype.render?e.__c=o=new $(m,S):(e.__c=o=new T(m,S),o.constructor=$,o.render=Ke),g&&g.sub(o),o.props=m,o.state||(o.state={}),o.context=S,o.__n=r,p=o.__d=!0,o.__h=[],o._sb=[]),o.__s==null&&(o.__s=o.state),$.getDerivedStateFromProps!=null&&(o.__s==o.state&&(o.__s=x({},o.__s)),x(o.__s,$.getDerivedStateFromProps(m,o.__s))),l=o.props,f=o.state,o.__v=e,p)$.getDerivedStateFromProps==null&&o.componentWillMount!=null&&o.componentWillMount(),o.componentDidMount!=null&&o.__h.push(o.componentDidMount);else{if($.getDerivedStateFromProps==null&&m!==l&&o.componentWillReceiveProps!=null&&o.componentWillReceiveProps(m,S),!o.__e&&o.shouldComponentUpdate!=null&&o.shouldComponentUpdate(m,o.__s,S)===!1||e.__v===n.__v){for(e.__v!==n.__v&&(o.props=m,o.state=o.__s,o.__d=!1),o.__e=!1,e.__e=n.__e,e.__k=n.__k,e.__k.forEach(function(I){I&&(I.__=e)}),O=0;O<o._sb.length;O++)o.__h.push(o._sb[O]);o._sb=[],o.__h.length&&s.push(o);break e}o.componentWillUpdate!=null&&o.componentWillUpdate(m,o.__s,S),o.componentDidUpdate!=null&&o.__h.push(function(){o.componentDidUpdate(l,f,d)})}if(o.context=S,o.props=m,o.__P=t,L=a.__r,le=0,"prototype"in $&&$.prototype.render){for(o.state=o.__s,o.__d=!1,L&&L(e),c=o.render(o.props,o.state,o.context),F=0;F<o._sb.length;F++)o.__h.push(o._sb[F]);o._sb=[]}else do o.__d=!1,L&&L(e),c=o.render(o.props,o.state,o.context),o.state=o.__s;while(o.__d&&++le<25);o.state=o.__s,o.getChildContext!=null&&(r=x(x({},r),o.getChildContext())),p||o.getSnapshotBeforeUpdate==null||(d=o.getSnapshotBeforeUpdate(l,f)),j=c!=null&&c.type===Q&&c.key==null?c.props.children:c,Pe(t,Array.isArray(j)?j:[j],e,n,r,_,i,s,u,h),o.base=e.__e,e.__h=null,o.__h.length&&s.push(o),w&&(o.__E=o.__=null),o.__e=!1}else i==null&&e.__v===n.__v?(e.__k=n.__k,e.__e=n.__e):e.__e=qe(n.__e,e,n,r,_,i,s,h);(c=a.diffed)&&c(e)}catch(I){e.__v=null,(h||i!=null)&&(e.__e=u,e.__h=!!h,i[i.indexOf(u)]=null),a.__e(I,e,n)}}function Te(t,e){a.__c&&a.__c(e,t),t.some(function(n){try{t=n.__h,n.__h=[],t.some(function(r){r.call(n)})}catch(r){a.__e(r,n.__v)}})}function qe(t,e,n,r,_,i,s,u){var h,c,o,p=n.props,l=e.props,f=e.type,d=0;if(f==="svg"&&(_=!0),i!=null){for(;d<i.length;d++)if((h=i[d])&&"setAttribute"in h==!!f&&(f?h.localName===f:h.nodeType===3)){t=h,i[d]=null;break}}if(t==null){if(f===null)return document.createTextNode(l);t=_?document.createElementNS("http://www.w3.org/2000/svg",f):document.createElement(f,l.is&&l),i=null,u=!1}if(f===null)p===l||u&&t.data===l||(t.data=l);else{if(i=i&&K.call(t.childNodes),c=(p=n.props||R).dangerouslySetInnerHTML,o=l.dangerouslySetInnerHTML,!u){if(i!=null)for(p={},d=0;d<t.attributes.length;d++)p[t.attributes[d].name]=t.attributes[d].value;(o||c)&&(o&&(c&&o.__html==c.__html||o.__html===t.innerHTML)||(t.innerHTML=o&&o.__html||""))}if(Je(t,l,p,_,u),o)e.__k=[];else if(d=e.props.children,Pe(t,Array.isArray(d)?d:[d],e,n,r,_&&f!=="foreignObject",i,s,i?i[0]:n.__k&&U(n,0),u),i!=null)for(d=i.length;d--;)i[d]!=null&&Ce(i[d]);u||("value"in l&&(d=l.value)!==void 0&&(d!==t.value||f==="progress"&&!d||f==="option"&&d!==p.value)&&G(t,"value",d,p.value,!1),"checked"in l&&(d=l.checked)!==void 0&&d!==t.checked&&G(t,"checked",d,p.checked,!1))}return t}function Ae(t,e,n){try{typeof t=="function"?t(e):t.current=e}catch(r){a.__e(r,n)}}function Ue(t,e,n){var r,_;if(a.unmount&&a.unmount(t),(r=t.ref)&&(r.current&&r.current!==t.__e||Ae(r,null,e)),(r=t.__c)!=null){if(r.componentWillUnmount)try{r.componentWillUnmount()}catch(i){a.__e(i,e)}r.base=r.__P=null,t.__c=void 0}if(r=t.__k)for(_=0;_<r.length;_++)r[_]&&Ue(r[_],e,n||typeof t.type!="function");n||t.__e==null||Ce(t.__e),t.__=t.__e=t.__d=void 0}function Ke(t,e,n){return this.constructor(t,n)}function Qe(t,e,n){var r,_,i;a.__&&a.__(t,e),_=(r=typeof n=="function")?null:n&&n.__k||e.__k,i=[],_e(e,t=(!r&&n||e).__k=Ge(Q,null,[t]),_||R,R,e.ownerSVGElement!==void 0,!r&&n?[n]:_?null:e.firstChild?K.call(e.childNodes):null,i,!r&&n?n:_?_.__e:e.firstChild,r),Te(i,t)}K=xe.slice,a={__e:function(t,e,n,r){for(var _,i,s;e=e.__;)if((_=e.__c)&&!_.__)try{if((i=_.constructor)&&i.getDerivedStateFromError!=null&&(_.setState(i.getDerivedStateFromError(t)),s=_.__d),_.componentDidCatch!=null&&(_.componentDidCatch(t,r||{}),s=_.__d),s)return _.__E=_}catch(u){t=u}throw t}},$e=0,T.prototype.setState=function(t,e){var n;n=this.__s!=null&&this.__s!==this.state?this.__s:this.__s=x({},this.state),typeof t=="function"&&(t=t(x({},n),this.props)),t&&x(n,t),t!=null&&this.__v&&(e&&this._sb.push(e),ae(this))},T.prototype.forceUpdate=function(t){this.__v&&(this.__e=!0,t&&this.__h.push(t),ae(this))},T.prototype.render=Q,H=[],Se=typeof Promise=="function"?Promise.prototype.then.bind(Promise.resolve()):setTimeout,ne=function(t,e){return t.__v.__b-e.__v.__b},z.__r=0;var Me,k,ee,ve,ie=0,Oe=[],V=[],ye=a.__b,me=a.__r,ge=a.diffed,be=a.__c,ke=a.unmount;function Xe(t,e){a.__h&&a.__h(k,t,ie||e),ie=0;var n=k.__H||(k.__H={__:[],__h:[]});return t>=n.__.length&&n.__.push({__V:V}),n.__[t]}function Ye(t){return ie=5,X(function(){return{current:t}},[])}function X(t,e){var n=Xe(Me++,7);return tt(n.__H,e)?(n.__V=t(),n.i=e,n.__h=t,n.__V):n.__}function Ze(){for(var t;t=Oe.shift();)if(t.__P&&t.__H)try{t.__H.__h.forEach(B),t.__H.__h.forEach(re),t.__H.__h=[]}catch(e){t.__H.__h=[],a.__e(e,t.__v)}}a.__b=function(t){k=null,ye&&ye(t)},a.__r=function(t){me&&me(t),Me=0;var e=(k=t.__c).__H;e&&(ee===k?(e.__h=[],k.__h=[],e.__.forEach(function(n){n.__N&&(n.__=n.__N),n.__V=V,n.__N=n.i=void 0})):(e.__h.forEach(B),e.__h.forEach(re),e.__h=[])),ee=k},a.diffed=function(t){ge&&ge(t);var e=t.__c;e&&e.__H&&(e.__H.__h.length&&(Oe.push(e)!==1&&ve===a.requestAnimationFrame||((ve=a.requestAnimationFrame)||et)(Ze)),e.__H.__.forEach(function(n){n.i&&(n.__H=n.i),n.__V!==V&&(n.__=n.__V),n.i=void 0,n.__V=V})),ee=k=null},a.__c=function(t,e){e.some(function(n){try{n.__h.forEach(B),n.__h=n.__h.filter(function(r){return!r.__||re(r)})}catch(r){e.some(function(_){_.__h&&(_.__h=[])}),e=[],a.__e(r,n.__v)}}),be&&be(t,e)},a.unmount=function(t){ke&&ke(t);var e,n=t.__c;n&&n.__H&&(n.__H.__.forEach(function(r){try{B(r)}catch(_){e=_}}),n.__H=void 0,e&&a.__e(e,n.__v))};var we=typeof requestAnimationFrame=="function";function et(t){var e,n=function(){clearTimeout(r),we&&cancelAnimationFrame(e),setTimeout(t)},r=setTimeout(n,100);we&&(e=requestAnimationFrame(n))}function B(t){var e=k,n=t.__c;typeof n=="function"&&(t.__c=void 0,n()),k=e}function re(t){var e=k;t.__c=t.__(),k=e}function tt(t,e){return!t||t.length!==e.length||e.some(function(n,r){return n!==t[r]})}function Y(){throw new Error("Cycle detected")}function se(){if(P>1)P--;else{for(var t,e=!1;A!==void 0;){var n=A;for(A=void 0,oe++;n!==void 0;){var r=n.o;if(n.o=void 0,n.f&=-3,!(8&n.f)&&Ie(n))try{n.c()}catch(_){e||(t=_,e=!0)}n=r}}if(oe=0,P--,e)throw t}}var y=void 0,A=void 0,P=0,oe=0,J=0;function Fe(t){if(y!==void 0){var e=t.n;if(e===void 0||e.t!==y)return e={i:0,S:t,p:y.s,n:void 0,t:y,e:void 0,x:void 0,r:e},y.s!==void 0&&(y.s.n=e),y.s=e,t.n=e,32&y.f&&t.S(e),e;if(e.i===-1)return e.i=0,e.n!==void 0&&(e.n.p=e.p,e.p!==void 0&&(e.p.n=e.n),e.p=y.s,e.n=void 0,y.s.n=e,y.s=e),e}}function b(t){this.v=t,this.i=0,this.n=void 0,this.t=void 0}b.prototype.h=function(){return!0};b.prototype.S=function(t){this.t!==t&&t.e===void 0&&(t.x=this.t,this.t!==void 0&&(this.t.e=t),this.t=t)};b.prototype.U=function(t){if(this.t!==void 0){var e=t.e,n=t.x;e!==void 0&&(e.x=n,t.e=void 0),n!==void 0&&(n.e=e,t.x=void 0),t===this.t&&(this.t=n)}};b.prototype.subscribe=function(t){var e=this;return ce(function(){var n=e.value,r=32&this.f;this.f&=-33;try{t(n)}finally{this.f|=r}})};b.prototype.valueOf=function(){return this.value};b.prototype.toString=function(){return this.value+""};b.prototype.toJSON=function(){return this.value};b.prototype.peek=function(){return this.v};Object.defineProperty(b.prototype,"value",{get:function(){var t=Fe(this);return t!==void 0&&(t.i=this.i),this.v},set:function(t){if(y instanceof C&&function(){throw new Error("Computed cannot have side-effects")}(),t!==this.v){oe>100&&Y(),this.v=t,this.i++,J++,P++;try{for(var e=this.t;e!==void 0;e=e.x)e.t.N()}finally{se()}}}});function je(t){return new b(t)}function Ie(t){for(var e=t.s;e!==void 0;e=e.n)if(e.S.i!==e.i||!e.S.h()||e.S.i!==e.i)return!0;return!1}function De(t){for(var e=t.s;e!==void 0;e=e.n){var n=e.S.n;if(n!==void 0&&(e.r=n),e.S.n=e,e.i=-1,e.n===void 0){t.s=e;break}}}function We(t){for(var e=t.s,n=void 0;e!==void 0;){var r=e.p;e.i===-1?(e.S.U(e),r!==void 0&&(r.n=e.n),e.n!==void 0&&(e.n.p=r)):n=e,e.S.n=e.r,e.r!==void 0&&(e.r=void 0),e=r}t.s=n}function C(t){b.call(this,void 0),this.x=t,this.s=void 0,this.g=J-1,this.f=4}(C.prototype=new b).h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===J))return!0;if(this.g=J,this.f|=1,this.i>0&&!Ie(this))return this.f&=-2,!0;var t=y;try{De(this),y=this;var e=this.x();(16&this.f||this.v!==e||this.i===0)&&(this.v=e,this.f&=-17,this.i++)}catch(n){this.v=n,this.f|=16,this.i++}return y=t,We(this),this.f&=-2,!0};C.prototype.S=function(t){if(this.t===void 0){this.f|=36;for(var e=this.s;e!==void 0;e=e.n)e.S.S(e)}b.prototype.S.call(this,t)};C.prototype.U=function(t){if(this.t!==void 0&&(b.prototype.U.call(this,t),this.t===void 0)){this.f&=-33;for(var e=this.s;e!==void 0;e=e.n)e.S.U(e)}};C.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var t=this.t;t!==void 0;t=t.x)t.t.N()}};C.prototype.peek=function(){if(this.h()||Y(),16&this.f)throw this.v;return this.v};Object.defineProperty(C.prototype,"value",{get:function(){1&this.f&&Y();var t=Fe(this);if(this.h(),t!==void 0&&(t.i=this.i),16&this.f)throw this.v;return this.v}});function Ve(t){return new C(t)}function Be(t){var e=t.u;if(t.u=void 0,typeof e=="function"){P++;var n=y;y=void 0;try{e()}catch(r){throw t.f&=-2,t.f|=8,fe(t),r}finally{y=n,se()}}}function fe(t){for(var e=t.s;e!==void 0;e=e.n)e.S.U(e);t.x=void 0,t.s=void 0,Be(t)}function nt(t){if(y!==this)throw new Error("Out-of-order effect");We(this),y=t,this.f&=-2,8&this.f&&fe(this),se()}function M(t){this.x=t,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32}M.prototype.c=function(){var t=this.S();try{if(8&this.f||this.x===void 0)return;var e=this.x();typeof e=="function"&&(this.u=e)}finally{t()}};M.prototype.S=function(){1&this.f&&Y(),this.f|=1,this.f&=-9,Be(this),De(this),P++;var t=y;return y=this,nt.bind(this,t)};M.prototype.N=function(){2&this.f||(this.f|=2,this.o=A,A=this)};M.prototype.d=function(){this.f|=8,1&this.f||fe(this)};function ce(t){var e=new M(t);try{e.c()}catch(n){throw e.d(),n}return e.d.bind(e)}var Z,te;function E(t,e){a[t]=e.bind(null,a[t]||function(){})}function q(t){te&&te(),te=t&&t.S()}function Re(t){var e=this,n=t.data,r=N(n);r.value=n;var _=X(function(){for(var i=e.__v;i=i.__;)if(i.__c){i.__c.__$f|=4;break}return e.__$u.c=function(){e.base.data=_.peek()},Ve(function(){var s=r.value.value;return s===0?0:s===!0?"":s||""})},[]);return _.value}Re.displayName="_st";Object.defineProperties(b.prototype,{constructor:{configurable:!0,value:void 0},type:{configurable:!0,value:Re},props:{configurable:!0,get:function(){return{data:this}}},__b:{configurable:!0,value:1}});E("__b",function(t,e){if(typeof e.type=="string"){var n,r=e.props;for(var _ in r)if(_!=="children"){var i=r[_];i instanceof b&&(n||(e.__np=n={}),n[_]=i,r[_]=i.peek())}}t(e)});E("__r",function(t,e){q();var n,r=e.__c;r&&(r.__$f&=-2,(n=r.__$u)===void 0&&(r.__$u=n=function(_){var i;return ce(function(){i=this}),i.c=function(){r.__$f|=1,r.setState({})},i}())),Z=r,q(n),t(e)});E("__e",function(t,e,n,r){q(),Z=void 0,t(e,n,r)});E("diffed",function(t,e){q(),Z=void 0;var n;if(typeof e.type=="string"&&(n=e.__e)){var r=e.__np,_=e.props;if(r){var i=n.U;if(i)for(var s in i){var u=i[s];u!==void 0&&!(s in r)&&(u.d(),i[s]=void 0)}else n.U=i={};for(var h in r){var c=i[h],o=r[h];c===void 0?(c=it(n,h,o,_),i[h]=c):c.o(o,_)}}}t(e)});function it(t,e,n,r){var _=e in t&&t.ownerSVGElement===void 0,i=je(n);return{o:function(s,u){i.value=s,r=u},d:ce(function(){var s=i.value.value;r[e]!==s&&(r[e]=s,_?t[e]=s:s?t.setAttribute(e,s):t.removeAttribute(e))})}}E("unmount",function(t,e){if(typeof e.type=="string"){var n=e.__e;if(n){var r=n.U;if(r){n.U=void 0;for(var _ in r){var i=r[_];i&&i.d()}}}}else{var s=e.__c;if(s){var u=s.__$u;u&&(s.__$u=void 0,u.d())}}t(e)});E("__h",function(t,e,n,r){r<3&&(e.__$f|=2),t(e,n,r)});T.prototype.shouldComponentUpdate=function(t,e){var n=this.__$u;if(!(n&&n.s!==void 0||4&this.__$f)||3&this.__$f)return!0;for(var r in e)return!0;for(var _ in t)if(_!=="__source"&&t[_]!==this.props[_])return!0;for(var i in this.props)if(!(i in t))return!0;return!1};function N(t){return X(function(){return je(t)},[])}function rt(t){var e=Ye(t);return e.current=t,Z.__$f|=4,X(function(){return Ve(function(){return e.current()})},[])}const ot="/dist/assets/reload-f665aa04.svg";var _t=0;function v(t,e,n,r,_,i){var s,u,h={};for(u in e)u=="ref"?s=e[u]:h[u]=e[u];var c={type:t,props:h,key:n,ref:s,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,__h:null,constructor:void 0,__v:--_t,__source:_,__self:i};if(typeof t=="function"&&(s=t.defaultProps))for(u in s)h[u]===void 0&&(h[u]=s[u]);return a.vnode&&a.vnode(c),c}let D=!1;function st(){const t=Number(new URLSearchParams(location.search).get("tabId")),e=N([]),n=N(""),r=N(""),_=N(""),i=(c,o)=>c.toLocaleLowerCase().includes(o.toLocaleLowerCase()),s=rt(()=>e.value.filter(({job:c,supplier:o})=>{const p=n.value.startsWith("-"),l=p?n.value.slice(1).trim().split(" "):n.value.trim().split(" "),f=p?l.filter(Boolean).some(w=>i(c,w)):l.filter(Boolean).every(w=>i(c,w)),d=i(o,l[0]);return p?l.filter(Boolean).length===0||!f&&!d:f||d})),u=()=>v("div",{onClick:o=>{const l=o.target.closest("span.copy");navigator.clipboard.writeText(l==null?void 0:l.innerHTML)},children:s.value.map(({job:o,total:p,toTranslate:l,diff:f,paragraphs:d,supplier:w})=>v("div",{class:"extracted-word-count",children:[v("h3",{dangerouslySetInnerHTML:{__html:o}}),v("p",{children:[v("span",{children:"Total words:"}),v("span",{title:"copy",class:"copy",children:p})]}),v("p",{children:[v("span",{children:"Total words to translate:"}),v("span",{title:"copy",class:"copy",children:l})]}),v("p",{children:[v("span",{children:"Word diff:"}),v("span",{title:"copy",class:"copy",children:f})]}),v("p",{class:"blue",children:d}),v("p",{children:[v("span",{children:"Supplier:"}),v("span",{class:"violet",children:w})]})]}))});async function h(c){chrome.tabs.sendMessage(t,c)}return h({type:"job-count-words-reference"}),chrome.runtime.onMessage.addListener((c,o,p)=>{c.type==="job-count-words"?(e.value=c.payload,D=!1):c.type==="job-count-words-reference"?_.value=c.payload:c.type==="job-count-words-wrong-page"&&(setTimeout(()=>{h({type:"job-count-words"})},1e3),D=!0)}),v("div",{children:[v("div",{class:"reload-button",onClick:()=>{chrome.runtime.reload()},children:v("img",{src:ot})}),v("h1",{style:{minWidth:"250px",textAlign:"center",marginTop:"10px",marginBottom:0},children:"Contentools"}),v("div",{style:{height:"1.5rem",textAlign:"center",color:"gray"},children:_}),v("button",{style:{width:"100%"},onClick:async()=>{r.value="",!D&&(h({type:"job-count-words"}),D=!0)},children:"Calculate jobs word count"}),e.value.length>0?v("div",{style:{position:"sticky",backgroundColor:"white",zIndex:5,top:0,padding:"0.5rem 0"},children:v("input",{value:n.value,type:"search",onInput:c=>{n.value=c.target.value},placeholder:"filter job",style:{width:"100%"}})}):"",r.value&&v("p",{style:{margin:"0.5rem 0",textAlign:"center"},children:v("strong",{class:"red",children:r})}),v("p",{children:v(u,{})})]})}Qe(v(st,{}),document.getElementById("app"));