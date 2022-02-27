!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).advancedAnalyserProcessor={})}(this,(function(t){"use strict";function e(t){if(this.size=0|t,this.size<=1||0!=(this.size&this.size-1))throw new Error("FFT size must be a power of two and bigger than 1");this._csize=t<<1;for(var e=new Array(2*this.size),a=0;a<e.length;a+=2){const t=Math.PI*a/this.size;e[a]=Math.cos(t),e[a+1]=-Math.sin(t)}this.table=e;for(var s=0,i=1;this.size>i;i<<=1)s++;this._width=s%2==0?s-1:s,this._bitrev=new Array(1<<this._width);for(var n=0;n<this._bitrev.length;n++){this._bitrev[n]=0;for(var o=0;o<this._width;o+=2){var r=this._width-o-2;this._bitrev[n]|=(n>>>o&3)<<r}}this._out=null,this._data=null,this._inv=0}var a=e;e.prototype.fromComplexArray=function(t,e){for(var a=e||new Array(t.length>>>1),s=0;s<t.length;s+=2)a[s>>>1]=t[s];return a},e.prototype.createComplexArray=function(){const t=new Array(this._csize);for(var e=0;e<t.length;e++)t[e]=0;return t},e.prototype.toComplexArray=function(t,e){for(var a=e||this.createComplexArray(),s=0;s<a.length;s+=2)a[s]=t[s>>>1],a[s+1]=0;return a},e.prototype.completeSpectrum=function(t){for(var e=this._csize,a=e>>>1,s=2;s<a;s+=2)t[e-s]=t[s],t[e-s+1]=-t[s+1]},e.prototype.transform=function(t,e){if(t===e)throw new Error("Input and output buffers must be different");this._out=t,this._data=e,this._inv=0,this._transform4(),this._out=null,this._data=null},e.prototype.realTransform=function(t,e){if(t===e)throw new Error("Input and output buffers must be different");this._out=t,this._data=e,this._inv=0,this._realTransform4(),this._out=null,this._data=null},e.prototype.inverseTransform=function(t,e){if(t===e)throw new Error("Input and output buffers must be different");this._out=t,this._data=e,this._inv=1,this._transform4();for(var a=0;a<t.length;a++)t[a]/=this.size;this._out=null,this._data=null},e.prototype._transform4=function(){var t,e,a=this._out,s=this._csize,i=1<<this._width,n=s/i<<1,o=this._bitrev;if(4===n)for(t=0,e=0;t<s;t+=n,e++){const a=o[e];this._singleTransform2(t,a,i)}else for(t=0,e=0;t<s;t+=n,e++){const a=o[e];this._singleTransform4(t,a,i)}var r=this._inv?-1:1,f=this.table;for(i>>=2;i>=2;i>>=2){var h=(n=s/i<<1)>>>2;for(t=0;t<s;t+=n)for(var l=t+h,u=t,_=0;u<l;u+=2,_+=i){const t=u,e=t+h,s=e+h,i=s+h,n=a[t],o=a[t+1],l=a[e],c=a[e+1],y=a[s],p=a[s+1],d=a[i],m=a[i+1],g=n,b=o,T=f[_],v=r*f[_+1],D=l*T-c*v,F=l*v+c*T,w=f[2*_],q=r*f[2*_+1],A=y*w-p*q,B=y*q+p*w,M=f[3*_],z=r*f[3*_+1],C=d*M-m*z,I=d*z+m*M,L=g+A,x=b+B,S=g-A,k=b-B,P=D+C,O=F+I,R=r*(D-C),W=r*(F-I),E=L+P,U=x+O,j=L-P,V=x-O,G=S+W,H=k-R,J=S-W,K=k+R;a[t]=E,a[t+1]=U,a[e]=G,a[e+1]=H,a[s]=j,a[s+1]=V,a[i]=J,a[i+1]=K}}},e.prototype._singleTransform2=function(t,e,a){const s=this._out,i=this._data,n=i[e],o=i[e+1],r=i[e+a],f=i[e+a+1],h=n+r,l=o+f,u=n-r,_=o-f;s[t]=h,s[t+1]=l,s[t+2]=u,s[t+3]=_},e.prototype._singleTransform4=function(t,e,a){const s=this._out,i=this._data,n=this._inv?-1:1,o=2*a,r=3*a,f=i[e],h=i[e+1],l=i[e+a],u=i[e+a+1],_=i[e+o],c=i[e+o+1],y=i[e+r],p=i[e+r+1],d=f+_,m=h+c,g=f-_,b=h-c,T=l+y,v=u+p,D=n*(l-y),F=n*(u-p),w=d+T,q=m+v,A=g+F,B=b-D,M=d-T,z=m-v,C=g-F,I=b+D;s[t]=w,s[t+1]=q,s[t+2]=A,s[t+3]=B,s[t+4]=M,s[t+5]=z,s[t+6]=C,s[t+7]=I},e.prototype._realTransform4=function(){var t,e,a=this._out,s=this._csize,i=1<<this._width,n=s/i<<1,o=this._bitrev;if(4===n)for(t=0,e=0;t<s;t+=n,e++){const a=o[e];this._singleRealTransform2(t,a>>>1,i>>>1)}else for(t=0,e=0;t<s;t+=n,e++){const a=o[e];this._singleRealTransform4(t,a>>>1,i>>>1)}var r=this._inv?-1:1,f=this.table;for(i>>=2;i>=2;i>>=2){var h=(n=s/i<<1)>>>1,l=h>>>1,u=l>>>1;for(t=0;t<s;t+=n)for(var _=0,c=0;_<=u;_+=2,c+=i){var y=t+_,p=y+l,d=p+l,m=d+l,g=a[y],b=a[y+1],T=a[p],v=a[p+1],D=a[d],F=a[d+1],w=a[m],q=a[m+1],A=g,B=b,M=f[c],z=r*f[c+1],C=T*M-v*z,I=T*z+v*M,L=f[2*c],x=r*f[2*c+1],S=D*L-F*x,k=D*x+F*L,P=f[3*c],O=r*f[3*c+1],R=w*P-q*O,W=w*O+q*P,E=A+S,U=B+k,j=A-S,V=B-k,G=C+R,H=I+W,J=r*(C-R),K=r*(I-W),N=E+G,Q=U+H,X=j+K,Y=V-J;if(a[y]=N,a[y+1]=Q,a[p]=X,a[p+1]=Y,0!==_){if(_!==u){var Z=j+-r*K,$=-V+-r*J,tt=E+-r*G,et=-U- -r*H,at=t+l-_,st=t+h-_;a[at]=Z,a[at+1]=$,a[st]=tt,a[st+1]=et}}else{var it=E-G,nt=U-H;a[d]=it,a[d+1]=nt}}}},e.prototype._singleRealTransform2=function(t,e,a){const s=this._out,i=this._data,n=i[e],o=i[e+a],r=n+o,f=n-o;s[t]=r,s[t+1]=0,s[t+2]=f,s[t+3]=0},e.prototype._singleRealTransform4=function(t,e,a){const s=this._out,i=this._data,n=this._inv?-1:1,o=2*a,r=3*a,f=i[e],h=i[e+a],l=i[e+o],u=i[e+r],_=f+l,c=f-l,y=h+u,p=n*(h-u),d=_+y,m=c,g=-p,b=_-y,T=c,v=p;s[t]=d,s[t+1]=0,s[t+2]=m,s[t+3]=g,s[t+4]=b,s[t+5]=0,s[t+6]=T,s[t+7]=v};var s,i,n,o;!function(t){t[t.start=0]="start",t[t.stop=1]="stop",t[t.frequencyDataAvailable=2]="frequencyDataAvailable",t[t.byteFrequencyDataAvailable=3]="byteFrequencyDataAvailable",t[t.getFloatFrequencyData=4]="getFloatFrequencyData",t[t.requestedFloatFrequencyDataAvailable=5]="requestedFloatFrequencyDataAvailable",t[t.getByteFrequencyData=6]="getByteFrequencyData",t[t.requestedByteFrequencyDataAvailable=7]="requestedByteFrequencyDataAvailable",t[t.getFloatTimeDomainData=8]="getFloatTimeDomainData",t[t.requestedFloatTimeDomainDataAvailable=9]="requestedFloatTimeDomainDataAvailable",t[t.getByteTimeDomainData=10]="getByteTimeDomainData",t[t.requestedByteTimeDomainDataAvailable=11]="requestedByteTimeDomainDataAvailable",t[t.startedListeningTo=12]="startedListeningTo",t[t.stoppedListeningTo=13]="stoppedListeningTo"}(s||(s={})),function(t){t.fftSize="fftSize",t.samplesBetweenTransforms="samplesBetweenTransforms",t.dataAsByteArray="dataAsByteArray",t.windowFunction="windowFunction"}(i||(i={})),function(t){t.frequencydata="frequencydata",t.bytefrequencydata="bytefrequencydata",t.timedomaindata="timedomaindata",t.bytetimedomaindata="bytetimedomaindata"}(n||(n={})),function(t){t.none="none",t.blackmanWindow="blackmanWindow"}(o||(o={}));const r={none:()=>{},blackmanWindow:t=>{const e=t.length;for(let a=0;a<e;a++){const s=a/e,i=.42-.5*Math.cos(2*Math.PI*s)+.08*Math.cos(2*Math.PI*2*s);t[a]*=Math.abs(i)}}},f=t=>20*Math.log10(t),h=(t,e,a)=>Math.min(Math.max(t,e),a);class l extends AudioWorkletProcessor{_samplesCount=0;_count=0;_first=!0;_fftAnalyser;_fftSize;_fftInput;_fftOutput;_lastTransform;_samplesBetweenTransforms;_windowFunctionType=o.blackmanWindow;_isListeningTo={frequencydata:!1,bytefrequencydata:!1,timedomaindata:!1,bytetimedomaindata:!1};_buffer=new Float32Array(32768);_minDecibels=-100;_maxDecibels=-30;_smoothingTimeConstant=0;_portMap=new Map;get _frequencyBinCount(){return this._fftSize/2}set frequencyBinCount(t){this._fftSize=2*t}static get parameterDescriptors(){return[{name:"isRecording",defaultValue:1}]}constructor(t){super();const{fftSize:e,samplesBetweenTransforms:s,windowFunction:i=o.blackmanWindow}=t.processorOptions;this._fftAnalyser=new a(e),this._fftInput=new Float32Array(e),this._fftOutput=this._fftAnalyser.createComplexArray(),this._fftSize=e,this._lastTransform=new Float32Array(this._frequencyBinCount),this._samplesBetweenTransforms=s,this._samplesCount=0,this._windowFunctionType=i,this.port.onmessage=t=>this._onmessage(t.data)}_onmessage(t){switch(t.type){case s.getFloatFrequencyData:this._getFloatFrequencyData(t.id);break;case s.getByteFrequencyData:this._getByteFrequencyData(t.id);break;case s.getFloatTimeDomainData:this._getFloatTimeDomainData(t.id);break;case s.getByteTimeDomainData:this._getByteTimeDomainData(t.id);break;case s.startedListeningTo:this._isListeningTo[t.payload]=!0;break;case s.stoppedListeningTo:this._isListeningTo[t.payload]=!1}}_postMessage(t,e){this.port.postMessage(t,e)}_shouldFlush(){return(this._isListeningTo.frequencydata||this._isListeningTo.bytefrequencydata)&&this._samplesCount%this._samplesBetweenTransforms==0}_appendToBuffer(t){this._buffer[this._samplesCount%this._buffer.length]=t,this._samplesCount=this._samplesCount+1,this._shouldFlush()&&this._flush()}_updateFftInput(){const t=(this._samplesCount-this._fftSize)%this._buffer.length;for(let e=0;e<this._fftInput.length;e++)this._fftInput[e]=t+e<0?0:this._buffer[(t+e)%this._buffer.length];r[this._windowFunctionType](this._fftInput)}_convertFloatToDb(t){const e=Math.min(this._lastTransform.length,t.length);if(e>0){const a=this._lastTransform;for(let s=0;s<e;++s)t[s]=f(a[s])}}_convertToByteData(t){const e=Math.min(this._lastTransform.length,t.length);if(e>0){const a=this._lastTransform,s=1/(this._maxDecibels-this._minDecibels);for(let i=0;i<e;++i){const e=a[i],n=255*(f(e)-this._minDecibels)*s;t[i]=h(0|n,0,255)}}}_doFft(){this._updateFftInput(),this._fftAnalyser.realTransform(this._fftOutput,this._fftInput);const t=1/this._fftSize,e=h(this._smoothingTimeConstant,0,1);for(let a=0;a<this._lastTransform.length;a++){const s=Math.abs(Math.hypot(this._fftOutput[2*a],this._fftOutput[2*a+1]))*t;this._lastTransform[a]=e*this._lastTransform[a]+(1-e)*s}}_flush(){if(this._doFft(),this._isListeningTo.frequencydata){const t=new Float32Array(this._frequencyBinCount);this._convertFloatToDb(t),this._postMessage({type:s.frequencyDataAvailable,payload:t})}if(this._isListeningTo.bytefrequencydata){const t=new Uint8Array(this._frequencyBinCount);this._convertToByteData(t),this._postMessage({type:s.byteFrequencyDataAvailable,payload:t})}}_getFloatFrequencyData(t){const e=new Float32Array(this._frequencyBinCount);this._doFft(),this._convertFloatToDb(e),this._postMessage({id:t,type:s.requestedFloatFrequencyDataAvailable,payload:e.buffer},[e.buffer])}_getByteFrequencyData(t){this._doFft();const e=new Uint8Array(this._frequencyBinCount);this._convertToByteData(e),this._postMessage({id:t,type:s.requestedByteFrequencyDataAvailable,payload:e.buffer},[e.buffer])}_getFloatTimeDomainData(t){this._updateFftInput(),this._postMessage({id:t,type:s.requestedFloatTimeDomainDataAvailable,payload:this._fftInput})}_getByteTimeDomainData(t){this._updateFftInput();const e=new Uint8Array(this._fftSize);for(let t=0;t<this._fftSize;++t)e[t]=h(128*(this._fftInput[t]+1)|0,0,255);this._postMessage({id:t,type:s.requestedByteTimeDomainDataAvailable,payload:e.buffer},[e.buffer])}process(t,e,a){const s=a.isRecording;for(let e=0;e<t.length;e++){if(1===s[e]&&t[0][0])for(let e=0;e<t[0][0].length;e++)this._appendToBuffer(t[0][0][e])}return!0}}registerProcessor("AdvancedAnalyserProcessor",l),t.AdvancedAnalyserProcessor=l,Object.defineProperty(t,"__esModule",{value:!0})}));
