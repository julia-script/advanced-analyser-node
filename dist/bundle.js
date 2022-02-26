(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.advancedAnalyserNode = {}));
})(this, (function (exports) { 'use strict';

  var MessageTypes;
  (function (MessageTypes) {
      MessageTypes[MessageTypes["start"] = 0] = "start";
      MessageTypes[MessageTypes["stop"] = 1] = "stop";
      MessageTypes[MessageTypes["frequencyDataAvailable"] = 2] = "frequencyDataAvailable";
      MessageTypes[MessageTypes["byteFrequencyDataAvailable"] = 3] = "byteFrequencyDataAvailable";
      MessageTypes[MessageTypes["getFloatFrequencyData"] = 4] = "getFloatFrequencyData";
      MessageTypes[MessageTypes["requestedFloatFrequencyDataAvailable"] = 5] = "requestedFloatFrequencyDataAvailable";
      MessageTypes[MessageTypes["getByteFrequencyData"] = 6] = "getByteFrequencyData";
      MessageTypes[MessageTypes["requestedByteFrequencyDataAvailable"] = 7] = "requestedByteFrequencyDataAvailable";
      MessageTypes[MessageTypes["floatTimeDomainData"] = 8] = "floatTimeDomainData";
      MessageTypes[MessageTypes["byteTimeDomainData"] = 9] = "byteTimeDomainData";
      MessageTypes[MessageTypes["startedListeningTo"] = 10] = "startedListeningTo";
      MessageTypes[MessageTypes["stoppedListeningTo"] = 11] = "stoppedListeningTo";
  })(MessageTypes || (MessageTypes = {}));
  var ProcessorParameters;
  (function (ProcessorParameters) {
      ProcessorParameters["fftSize"] = "fftSize";
      ProcessorParameters["samplesBetweenTransforms"] = "samplesBetweenTransforms";
      ProcessorParameters["dataAsByteArray"] = "dataAsByteArray";
      ProcessorParameters["windowFunction"] = "windowFunction";
  })(ProcessorParameters || (ProcessorParameters = {}));
  var EventListenerTypes;
  (function (EventListenerTypes) {
      EventListenerTypes["frequencydata"] = "frequencydata";
      EventListenerTypes["bytefrequencydata"] = "bytefrequencydata";
  })(EventListenerTypes || (EventListenerTypes = {}));
  var WindowingFunctionTypes;
  (function (WindowingFunctionTypes) {
      WindowingFunctionTypes["none"] = "none";
      WindowingFunctionTypes["blackmanWindow"] = "blackmanWindow";
  })(WindowingFunctionTypes || (WindowingFunctionTypes = {}));

  var processor = "IWZ1bmN0aW9uKHQsZSl7Im9iamVjdCI9PXR5cGVvZiBleHBvcnRzJiYidW5kZWZpbmVkIiE9dHlwZW9mIG1vZHVsZT9lKGV4cG9ydHMpOiJmdW5jdGlvbiI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKFsiZXhwb3J0cyJdLGUpOmUoKHQ9InVuZGVmaW5lZCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6dHx8c2VsZikuYWR2YW5jZWRBbmFseXNlclByb2Nlc3Nvcj17fSl9KHRoaXMsKGZ1bmN0aW9uKHQpeyJ1c2Ugc3RyaWN0IjtmdW5jdGlvbiBlKHQpe2lmKHRoaXMuc2l6ZT0wfHQsdGhpcy5zaXplPD0xfHwwIT0odGhpcy5zaXplJnRoaXMuc2l6ZS0xKSl0aHJvdyBuZXcgRXJyb3IoIkZGVCBzaXplIG11c3QgYmUgYSBwb3dlciBvZiB0d28gYW5kIGJpZ2dlciB0aGFuIDEiKTt0aGlzLl9jc2l6ZT10PDwxO2Zvcih2YXIgZT1uZXcgQXJyYXkoMip0aGlzLnNpemUpLHM9MDtzPGUubGVuZ3RoO3MrPTIpe2NvbnN0IHQ9TWF0aC5QSSpzL3RoaXMuc2l6ZTtlW3NdPU1hdGguY29zKHQpLGVbcysxXT0tTWF0aC5zaW4odCl9dGhpcy50YWJsZT1lO2Zvcih2YXIgYT0wLG49MTt0aGlzLnNpemU+bjtuPDw9MSlhKys7dGhpcy5fd2lkdGg9YSUyPT0wP2EtMTphLHRoaXMuX2JpdHJldj1uZXcgQXJyYXkoMTw8dGhpcy5fd2lkdGgpO2Zvcih2YXIgaT0wO2k8dGhpcy5fYml0cmV2Lmxlbmd0aDtpKyspe3RoaXMuX2JpdHJldltpXT0wO2Zvcih2YXIgbz0wO288dGhpcy5fd2lkdGg7bys9Mil7dmFyIHI9dGhpcy5fd2lkdGgtby0yO3RoaXMuX2JpdHJldltpXXw9KGk+Pj5vJjMpPDxyfX10aGlzLl9vdXQ9bnVsbCx0aGlzLl9kYXRhPW51bGwsdGhpcy5faW52PTB9dmFyIHM9ZTtlLnByb3RvdHlwZS5mcm9tQ29tcGxleEFycmF5PWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciBzPWV8fG5ldyBBcnJheSh0Lmxlbmd0aD4+PjEpLGE9MDthPHQubGVuZ3RoO2ErPTIpc1thPj4+MV09dFthXTtyZXR1cm4gc30sZS5wcm90b3R5cGUuY3JlYXRlQ29tcGxleEFycmF5PWZ1bmN0aW9uKCl7Y29uc3QgdD1uZXcgQXJyYXkodGhpcy5fY3NpemUpO2Zvcih2YXIgZT0wO2U8dC5sZW5ndGg7ZSsrKXRbZV09MDtyZXR1cm4gdH0sZS5wcm90b3R5cGUudG9Db21wbGV4QXJyYXk9ZnVuY3Rpb24odCxlKXtmb3IodmFyIHM9ZXx8dGhpcy5jcmVhdGVDb21wbGV4QXJyYXkoKSxhPTA7YTxzLmxlbmd0aDthKz0yKXNbYV09dFthPj4+MV0sc1thKzFdPTA7cmV0dXJuIHN9LGUucHJvdG90eXBlLmNvbXBsZXRlU3BlY3RydW09ZnVuY3Rpb24odCl7Zm9yKHZhciBlPXRoaXMuX2NzaXplLHM9ZT4+PjEsYT0yO2E8czthKz0yKXRbZS1hXT10W2FdLHRbZS1hKzFdPS10W2ErMV19LGUucHJvdG90eXBlLnRyYW5zZm9ybT1mdW5jdGlvbih0LGUpe2lmKHQ9PT1lKXRocm93IG5ldyBFcnJvcigiSW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIG11c3QgYmUgZGlmZmVyZW50Iik7dGhpcy5fb3V0PXQsdGhpcy5fZGF0YT1lLHRoaXMuX2ludj0wLHRoaXMuX3RyYW5zZm9ybTQoKSx0aGlzLl9vdXQ9bnVsbCx0aGlzLl9kYXRhPW51bGx9LGUucHJvdG90eXBlLnJlYWxUcmFuc2Zvcm09ZnVuY3Rpb24odCxlKXtpZih0PT09ZSl0aHJvdyBuZXcgRXJyb3IoIklucHV0IGFuZCBvdXRwdXQgYnVmZmVycyBtdXN0IGJlIGRpZmZlcmVudCIpO3RoaXMuX291dD10LHRoaXMuX2RhdGE9ZSx0aGlzLl9pbnY9MCx0aGlzLl9yZWFsVHJhbnNmb3JtNCgpLHRoaXMuX291dD1udWxsLHRoaXMuX2RhdGE9bnVsbH0sZS5wcm90b3R5cGUuaW52ZXJzZVRyYW5zZm9ybT1mdW5jdGlvbih0LGUpe2lmKHQ9PT1lKXRocm93IG5ldyBFcnJvcigiSW5wdXQgYW5kIG91dHB1dCBidWZmZXJzIG11c3QgYmUgZGlmZmVyZW50Iik7dGhpcy5fb3V0PXQsdGhpcy5fZGF0YT1lLHRoaXMuX2ludj0xLHRoaXMuX3RyYW5zZm9ybTQoKTtmb3IodmFyIHM9MDtzPHQubGVuZ3RoO3MrKyl0W3NdLz10aGlzLnNpemU7dGhpcy5fb3V0PW51bGwsdGhpcy5fZGF0YT1udWxsfSxlLnByb3RvdHlwZS5fdHJhbnNmb3JtND1mdW5jdGlvbigpe3ZhciB0LGUscz10aGlzLl9vdXQsYT10aGlzLl9jc2l6ZSxuPTE8PHRoaXMuX3dpZHRoLGk9YS9uPDwxLG89dGhpcy5fYml0cmV2O2lmKDQ9PT1pKWZvcih0PTAsZT0wO3Q8YTt0Kz1pLGUrKyl7Y29uc3Qgcz1vW2VdO3RoaXMuX3NpbmdsZVRyYW5zZm9ybTIodCxzLG4pfWVsc2UgZm9yKHQ9MCxlPTA7dDxhO3QrPWksZSsrKXtjb25zdCBzPW9bZV07dGhpcy5fc2luZ2xlVHJhbnNmb3JtNCh0LHMsbil9dmFyIHI9dGhpcy5faW52Py0xOjEsZj10aGlzLnRhYmxlO2ZvcihuPj49MjtuPj0yO24+Pj0yKXt2YXIgaD0oaT1hL248PDEpPj4+Mjtmb3IodD0wO3Q8YTt0Kz1pKWZvcih2YXIgbD10K2gsdT10LF89MDt1PGw7dSs9MixfKz1uKXtjb25zdCB0PXUsZT10K2gsYT1lK2gsbj1hK2gsaT1zW3RdLG89c1t0KzFdLGw9c1tlXSxjPXNbZSsxXSxwPXNbYV0seT1zW2ErMV0sZD1zW25dLG09c1tuKzFdLGI9aSxnPW8sdj1mW19dLFQ9cipmW18rMV0sdz1sKnYtYypULEY9bCpUK2MqdixBPWZbMipfXSxEPXIqZlsyKl8rMV0scT1wKkEteSpELHo9cCpEK3kqQSxNPWZbMypfXSxCPXIqZlszKl8rMV0sQz1kKk0tbSpCLEk9ZCpCK20qTSxTPWIrcSx4PWcreixMPWItcSxQPWcteixrPXcrQyxPPUYrSSxSPXIqKHctQyksVz1yKihGLUkpLEU9UytrLGo9eCtPLFU9Uy1rLFY9eC1PLEc9TCtXLEg9UC1SLEo9TC1XLEs9UCtSO3NbdF09RSxzW3QrMV09aixzW2VdPUcsc1tlKzFdPUgsc1thXT1VLHNbYSsxXT1WLHNbbl09SixzW24rMV09S319fSxlLnByb3RvdHlwZS5fc2luZ2xlVHJhbnNmb3JtMj1mdW5jdGlvbih0LGUscyl7Y29uc3QgYT10aGlzLl9vdXQsbj10aGlzLl9kYXRhLGk9bltlXSxvPW5bZSsxXSxyPW5bZStzXSxmPW5bZStzKzFdLGg9aStyLGw9bytmLHU9aS1yLF89by1mO2FbdF09aCxhW3QrMV09bCxhW3QrMl09dSxhW3QrM109X30sZS5wcm90b3R5cGUuX3NpbmdsZVRyYW5zZm9ybTQ9ZnVuY3Rpb24odCxlLHMpe2NvbnN0IGE9dGhpcy5fb3V0LG49dGhpcy5fZGF0YSxpPXRoaXMuX2ludj8tMToxLG89MipzLHI9MypzLGY9bltlXSxoPW5bZSsxXSxsPW5bZStzXSx1PW5bZStzKzFdLF89bltlK29dLGM9bltlK28rMV0scD1uW2Urcl0seT1uW2UrcisxXSxkPWYrXyxtPWgrYyxiPWYtXyxnPWgtYyx2PWwrcCxUPXUreSx3PWkqKGwtcCksRj1pKih1LXkpLEE9ZCt2LEQ9bStULHE9YitGLHo9Zy13LE09ZC12LEI9bS1ULEM9Yi1GLEk9Zyt3O2FbdF09QSxhW3QrMV09RCxhW3QrMl09cSxhW3QrM109eixhW3QrNF09TSxhW3QrNV09QixhW3QrNl09QyxhW3QrN109SX0sZS5wcm90b3R5cGUuX3JlYWxUcmFuc2Zvcm00PWZ1bmN0aW9uKCl7dmFyIHQsZSxzPXRoaXMuX291dCxhPXRoaXMuX2NzaXplLG49MTw8dGhpcy5fd2lkdGgsaT1hL248PDEsbz10aGlzLl9iaXRyZXY7aWYoND09PWkpZm9yKHQ9MCxlPTA7dDxhO3QrPWksZSsrKXtjb25zdCBzPW9bZV07dGhpcy5fc2luZ2xlUmVhbFRyYW5zZm9ybTIodCxzPj4+MSxuPj4+MSl9ZWxzZSBmb3IodD0wLGU9MDt0PGE7dCs9aSxlKyspe2NvbnN0IHM9b1tlXTt0aGlzLl9zaW5nbGVSZWFsVHJhbnNmb3JtNCh0LHM+Pj4xLG4+Pj4xKX12YXIgcj10aGlzLl9pbnY/LTE6MSxmPXRoaXMudGFibGU7Zm9yKG4+Pj0yO24+PTI7bj4+PTIpe3ZhciBoPShpPWEvbjw8MSk+Pj4xLGw9aD4+PjEsdT1sPj4+MTtmb3IodD0wO3Q8YTt0Kz1pKWZvcih2YXIgXz0wLGM9MDtfPD11O18rPTIsYys9bil7dmFyIHA9dCtfLHk9cCtsLGQ9eStsLG09ZCtsLGI9c1twXSxnPXNbcCsxXSx2PXNbeV0sVD1zW3krMV0sdz1zW2RdLEY9c1tkKzFdLEE9c1ttXSxEPXNbbSsxXSxxPWIsej1nLE09ZltjXSxCPXIqZltjKzFdLEM9dipNLVQqQixJPXYqQitUKk0sUz1mWzIqY10seD1yKmZbMipjKzFdLEw9dypTLUYqeCxQPXcqeCtGKlMsaz1mWzMqY10sTz1yKmZbMypjKzFdLFI9QSprLUQqTyxXPUEqTytEKmssRT1xK0wsaj16K1AsVT1xLUwsVj16LVAsRz1DK1IsSD1JK1csSj1yKihDLVIpLEs9ciooSS1XKSxOPUUrRyxRPWorSCxYPVUrSyxZPVYtSjtpZihzW3BdPU4sc1twKzFdPVEsc1t5XT1YLHNbeSsxXT1ZLDAhPT1fKXtpZihfIT09dSl7dmFyIFo9VSstcipLLCQ9LVYrLXIqSix0dD1FKy1yKkcsZXQ9LWotIC1yKkgsc3Q9dCtsLV8sYXQ9dCtoLV87c1tzdF09WixzW3N0KzFdPSQsc1thdF09dHQsc1thdCsxXT1ldH19ZWxzZXt2YXIgbnQ9RS1HLGl0PWotSDtzW2RdPW50LHNbZCsxXT1pdH19fX0sZS5wcm90b3R5cGUuX3NpbmdsZVJlYWxUcmFuc2Zvcm0yPWZ1bmN0aW9uKHQsZSxzKXtjb25zdCBhPXRoaXMuX291dCxuPXRoaXMuX2RhdGEsaT1uW2VdLG89bltlK3NdLHI9aStvLGY9aS1vO2FbdF09cixhW3QrMV09MCxhW3QrMl09ZixhW3QrM109MH0sZS5wcm90b3R5cGUuX3NpbmdsZVJlYWxUcmFuc2Zvcm00PWZ1bmN0aW9uKHQsZSxzKXtjb25zdCBhPXRoaXMuX291dCxuPXRoaXMuX2RhdGEsaT10aGlzLl9pbnY/LTE6MSxvPTIqcyxyPTMqcyxmPW5bZV0saD1uW2Urc10sbD1uW2Urb10sdT1uW2Urcl0sXz1mK2wsYz1mLWwscD1oK3UseT1pKihoLXUpLGQ9XytwLG09YyxiPS15LGc9Xy1wLHY9YyxUPXk7YVt0XT1kLGFbdCsxXT0wLGFbdCsyXT1tLGFbdCszXT1iLGFbdCs0XT1nLGFbdCs1XT0wLGFbdCs2XT12LGFbdCs3XT1UfTt2YXIgYSxuLGksbzshZnVuY3Rpb24odCl7dFt0LnN0YXJ0PTBdPSJzdGFydCIsdFt0LnN0b3A9MV09InN0b3AiLHRbdC5mcmVxdWVuY3lEYXRhQXZhaWxhYmxlPTJdPSJmcmVxdWVuY3lEYXRhQXZhaWxhYmxlIix0W3QuYnl0ZUZyZXF1ZW5jeURhdGFBdmFpbGFibGU9M109ImJ5dGVGcmVxdWVuY3lEYXRhQXZhaWxhYmxlIix0W3QuZ2V0RmxvYXRGcmVxdWVuY3lEYXRhPTRdPSJnZXRGbG9hdEZyZXF1ZW5jeURhdGEiLHRbdC5yZXF1ZXN0ZWRGbG9hdEZyZXF1ZW5jeURhdGFBdmFpbGFibGU9NV09InJlcXVlc3RlZEZsb2F0RnJlcXVlbmN5RGF0YUF2YWlsYWJsZSIsdFt0LmdldEJ5dGVGcmVxdWVuY3lEYXRhPTZdPSJnZXRCeXRlRnJlcXVlbmN5RGF0YSIsdFt0LnJlcXVlc3RlZEJ5dGVGcmVxdWVuY3lEYXRhQXZhaWxhYmxlPTddPSJyZXF1ZXN0ZWRCeXRlRnJlcXVlbmN5RGF0YUF2YWlsYWJsZSIsdFt0LmZsb2F0VGltZURvbWFpbkRhdGE9OF09ImZsb2F0VGltZURvbWFpbkRhdGEiLHRbdC5ieXRlVGltZURvbWFpbkRhdGE9OV09ImJ5dGVUaW1lRG9tYWluRGF0YSIsdFt0LnN0YXJ0ZWRMaXN0ZW5pbmdUbz0xMF09InN0YXJ0ZWRMaXN0ZW5pbmdUbyIsdFt0LnN0b3BwZWRMaXN0ZW5pbmdUbz0xMV09InN0b3BwZWRMaXN0ZW5pbmdUbyJ9KGF8fChhPXt9KSksZnVuY3Rpb24odCl7dC5mZnRTaXplPSJmZnRTaXplIix0LnNhbXBsZXNCZXR3ZWVuVHJhbnNmb3Jtcz0ic2FtcGxlc0JldHdlZW5UcmFuc2Zvcm1zIix0LmRhdGFBc0J5dGVBcnJheT0iZGF0YUFzQnl0ZUFycmF5Iix0LndpbmRvd0Z1bmN0aW9uPSJ3aW5kb3dGdW5jdGlvbiJ9KG58fChuPXt9KSksZnVuY3Rpb24odCl7dC5mcmVxdWVuY3lkYXRhPSJmcmVxdWVuY3lkYXRhIix0LmJ5dGVmcmVxdWVuY3lkYXRhPSJieXRlZnJlcXVlbmN5ZGF0YSJ9KGl8fChpPXt9KSksZnVuY3Rpb24odCl7dC5ub25lPSJub25lIix0LmJsYWNrbWFuV2luZG93PSJibGFja21hbldpbmRvdyJ9KG98fChvPXt9KSk7Y29uc3Qgcj17bm9uZTooKT0+e30sYmxhY2ttYW5XaW5kb3c6dD0+e2NvbnN0IGU9dC5sZW5ndGg7Zm9yKGxldCBzPTA7czxlO3MrKyl7Y29uc3QgYT1zL2Usbj0uNDItLjUqTWF0aC5jb3MoMipNYXRoLlBJKmEpKy4wOCpNYXRoLmNvcygyKk1hdGguUEkqMiphKTt0W3NdKj1NYXRoLmFicyhuKX19fSxmPXQ9PjIwKk1hdGgubG9nMTAodCksaD0odCxlLHMpPT5NYXRoLm1pbihNYXRoLm1heCh0LGUpLHMpO2NsYXNzIGwgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3J7X3NhbXBsZXNDb3VudD0wO19jb3VudD0wO19maXJzdD0hMDtfZmZ0QW5hbHlzZXI7X2ZmdFNpemU7X2ZmdElucHV0O19mZnRPdXRwdXQ7X2xhc3RUcmFuc2Zvcm07X3NhbXBsZXNCZXR3ZWVuVHJhbnNmb3Jtcztfd2luZG93RnVuY3Rpb25UeXBlPW8uYmxhY2ttYW5XaW5kb3c7X2lzTGlzdGVuaW5nVG89e2ZyZXF1ZW5jeWRhdGE6ITEsYnl0ZWZyZXF1ZW5jeWRhdGE6ITF9O19idWZmZXI9bmV3IEZsb2F0MzJBcnJheSgzMjc2OCk7X21pbkRlY2liZWxzPS0xMDA7X21heERlY2liZWxzPS0zMDtfc21vb3RoaW5nVGltZUNvbnN0YW50PTA7X3BvcnRNYXA9bmV3IE1hcDtzdGF0aWMgZ2V0IHBhcmFtZXRlckRlc2NyaXB0b3JzKCl7cmV0dXJuW3tuYW1lOiJpc1JlY29yZGluZyIsZGVmYXVsdFZhbHVlOjF9XX1jb25zdHJ1Y3Rvcih0KXtzdXBlcigpO2NvbnN0e2ZmdFNpemU6ZSxzYW1wbGVzQmV0d2VlblRyYW5zZm9ybXM6YSx3aW5kb3dGdW5jdGlvbjpuPW8uYmxhY2ttYW5XaW5kb3d9PXQucHJvY2Vzc29yT3B0aW9uczt0aGlzLl9mZnRBbmFseXNlcj1uZXcgcyhlKSx0aGlzLl9mZnRJbnB1dD1uZXcgRmxvYXQzMkFycmF5KGUpLHRoaXMuX2ZmdE91dHB1dD10aGlzLl9mZnRBbmFseXNlci5jcmVhdGVDb21wbGV4QXJyYXkoKSx0aGlzLl9sYXN0VHJhbnNmb3JtPW5ldyBGbG9hdDMyQXJyYXkoZS8yKSx0aGlzLl9mZnRTaXplPWUsdGhpcy5fc2FtcGxlc0JldHdlZW5UcmFuc2Zvcm1zPWEsdGhpcy5fc2FtcGxlc0NvdW50PTAsdGhpcy5fd2luZG93RnVuY3Rpb25UeXBlPW4sdGhpcy5wb3J0Lm9ubWVzc2FnZT10PT50aGlzLl9vbm1lc3NhZ2UodC5kYXRhKX1fb25tZXNzYWdlKHQpe3N3aXRjaCh0LnR5cGUpe2Nhc2UgYS5nZXRGbG9hdEZyZXF1ZW5jeURhdGE6dGhpcy5fZ2V0RmxvYXRGcmVxdWVuY3lEYXRhKHQuaWQpO2JyZWFrO2Nhc2UgYS5zdGFydGVkTGlzdGVuaW5nVG86dGhpcy5faXNMaXN0ZW5pbmdUb1t0LnBheWxvYWRdPSEwO2JyZWFrO2Nhc2UgYS5zdG9wcGVkTGlzdGVuaW5nVG86dGhpcy5faXNMaXN0ZW5pbmdUb1t0LnBheWxvYWRdPSExfX1fcG9zdE1lc3NhZ2UodCxlKXt0aGlzLnBvcnQucG9zdE1lc3NhZ2UodCxlKX1fc2hvdWxkRmx1c2goKXtyZXR1cm4odGhpcy5faXNMaXN0ZW5pbmdUby5mcmVxdWVuY3lkYXRhfHx0aGlzLl9pc0xpc3RlbmluZ1RvLmJ5dGVmcmVxdWVuY3lkYXRhKSYmdGhpcy5fc2FtcGxlc0NvdW50JXRoaXMuX3NhbXBsZXNCZXR3ZWVuVHJhbnNmb3Jtcz09MH1fYXBwZW5kVG9CdWZmZXIodCl7dGhpcy5fYnVmZmVyW3RoaXMuX3NhbXBsZXNDb3VudCV0aGlzLl9idWZmZXIubGVuZ3RoXT10LHRoaXMuX3NhbXBsZXNDb3VudD10aGlzLl9zYW1wbGVzQ291bnQrMSx0aGlzLl9zaG91bGRGbHVzaCgpJiZ0aGlzLl9mbHVzaCgpfV91cGRhdGVGZnRJbnB1dCgpe2NvbnN0IHQ9KHRoaXMuX3NhbXBsZXNDb3VudC10aGlzLl9mZnRTaXplKSV0aGlzLl9idWZmZXIubGVuZ3RoO2ZvcihsZXQgZT0wO2U8dGhpcy5fZmZ0SW5wdXQubGVuZ3RoO2UrKyl0aGlzLl9mZnRJbnB1dFtlXT10K2U8MD8wOnRoaXMuX2J1ZmZlclsodCtlKSV0aGlzLl9idWZmZXIubGVuZ3RoXTtyW3RoaXMuX3dpbmRvd0Z1bmN0aW9uVHlwZV0odGhpcy5fZmZ0SW5wdXQpfV9jb252ZXJ0RmxvYXRUb0RiKHQpe2NvbnN0IGU9TWF0aC5taW4odGhpcy5fbGFzdFRyYW5zZm9ybS5sZW5ndGgsdC5sZW5ndGgpO2lmKGU+MCl7Y29uc3Qgcz10aGlzLl9sYXN0VHJhbnNmb3JtO2ZvcihsZXQgYT0wO2E8ZTsrK2EpdFthXT1mKHNbYV0pfX1fY29udmVydFRvQnl0ZURhdGEodCl7Y29uc3QgZT1NYXRoLm1pbih0aGlzLl9sYXN0VHJhbnNmb3JtLmxlbmd0aCx0Lmxlbmd0aCk7aWYoZT4wKXtjb25zdCBzPXRoaXMuX2xhc3RUcmFuc2Zvcm0sYT0xLyh0aGlzLl9tYXhEZWNpYmVscy10aGlzLl9taW5EZWNpYmVscyk7Zm9yKGxldCBuPTA7bjxlOysrbil7Y29uc3QgZT1zW25dLGk9MjU1KihmKGUpLXRoaXMuX21pbkRlY2liZWxzKSphO3Rbbl09aCgwfGksMCwyNTUpfX19X2RvRmZ0KCl7dGhpcy5fdXBkYXRlRmZ0SW5wdXQoKSx0aGlzLl9mZnRBbmFseXNlci5yZWFsVHJhbnNmb3JtKHRoaXMuX2ZmdE91dHB1dCx0aGlzLl9mZnRJbnB1dCk7Y29uc3QgdD0xL3RoaXMuX2ZmdFNpemUsZT1oKHRoaXMuX3Ntb290aGluZ1RpbWVDb25zdGFudCwwLDEpO2ZvcihsZXQgcz0wO3M8dGhpcy5fbGFzdFRyYW5zZm9ybS5sZW5ndGg7cysrKXtjb25zdCBhPU1hdGguYWJzKE1hdGguaHlwb3QodGhpcy5fZmZ0T3V0cHV0WzIqc10sdGhpcy5fZmZ0T3V0cHV0WzIqcysxXSkpKnQ7dGhpcy5fbGFzdFRyYW5zZm9ybVtzXT1lKnRoaXMuX2xhc3RUcmFuc2Zvcm1bc10rKDEtZSkqYX19Z2V0IF9mZnRCaW5TaXplKCl7cmV0dXJuIHRoaXMuX2ZmdFNpemUvMn1fZmx1c2goKXtpZih0aGlzLl9kb0ZmdCgpLHRoaXMuX2lzTGlzdGVuaW5nVG8uZnJlcXVlbmN5ZGF0YSl7Y29uc3QgdD1uZXcgRmxvYXQzMkFycmF5KHRoaXMuX2ZmdEJpblNpemUpO3RoaXMuX2NvbnZlcnRGbG9hdFRvRGIodCksdGhpcy5fcG9zdE1lc3NhZ2Uoe3R5cGU6YS5mcmVxdWVuY3lEYXRhQXZhaWxhYmxlLHBheWxvYWQ6dH0pfWVsc2V7Y29uc3QgdD1uZXcgVWludDhBcnJheSh0aGlzLl9mZnRCaW5TaXplKTt0aGlzLl9jb252ZXJ0VG9CeXRlRGF0YSh0KSx0aGlzLl9wb3N0TWVzc2FnZSh7dHlwZTphLmJ5dGVGcmVxdWVuY3lEYXRhQXZhaWxhYmxlLHBheWxvYWQ6dH0pfX1fZ2V0RmxvYXRGcmVxdWVuY3lEYXRhKHQpe2NvbnN0IGU9bmV3IEZsb2F0MzJBcnJheSh0aGlzLl9mZnRTaXplLzIpO3RoaXMuX2RvRmZ0KCksdGhpcy5fY29udmVydEZsb2F0VG9EYihlKSx0aGlzLl9wb3N0TWVzc2FnZSh7aWQ6dCx0eXBlOmEucmVxdWVzdGVkRmxvYXRGcmVxdWVuY3lEYXRhQXZhaWxhYmxlLHBheWxvYWQ6ZS5idWZmZXJ9LFtlLmJ1ZmZlcl0pfV9nZXRCeXRlRnJlcXVlbmN5RGF0YSh0KXt0aGlzLl9kb0ZmdCgpO2NvbnN0IGU9bmV3IFVpbnQ4QXJyYXkodGhpcy5fZmZ0U2l6ZS8yKTt0aGlzLl9jb252ZXJ0VG9CeXRlRGF0YShlKSx0aGlzLl9wb3N0TWVzc2FnZSh7aWQ6dCx0eXBlOmEucmVxdWVzdGVkQnl0ZUZyZXF1ZW5jeURhdGFBdmFpbGFibGUscGF5bG9hZDplLmJ1ZmZlcn0sW2UuYnVmZmVyXSl9cHJvY2Vzcyh0LGUscyl7Y29uc3QgYT1zLmlzUmVjb3JkaW5nO2ZvcihsZXQgZT0wO2U8dC5sZW5ndGg7ZSsrKXtpZigxPT09YVtlXSYmdFswXVswXSlmb3IobGV0IGU9MDtlPHRbMF1bMF0ubGVuZ3RoO2UrKyl0aGlzLl9hcHBlbmRUb0J1ZmZlcih0WzBdWzBdW2VdKX1yZXR1cm4hMH19cmVnaXN0ZXJQcm9jZXNzb3IoIkFkdmFuY2VkQW5hbHlzZXJQcm9jZXNzb3IiLGwpLHQuQWR2YW5jZWRBbmFseXNlclByb2Nlc3Nvcj1sLE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCJfX2VzTW9kdWxlIix7dmFsdWU6ITB9KX0pKTsK";

  class AdvancedAnalyserNode extends AudioWorkletNode {
      fftSize;
      samplesBetweenTransforms;
      _portMapId = 0;
      _portMap = new Map();
      _eventListenersCount = {
          [EventListenerTypes.frequencydata]: [],
          [EventListenerTypes.bytefrequencydata]: [],
      };
      // _onDataAvailable = new CustomEvent('ondataavailable', { value: })
      constructor(context, { fftSize = 1024, samplesBetweenTransforms, windowFunction = WindowingFunctionTypes.blackmanWindow }) {
          super(context, 'AdvancedAnalyserProcessor', {
              processorOptions: {
                  [ProcessorParameters.fftSize]: fftSize,
                  [ProcessorParameters.samplesBetweenTransforms]: samplesBetweenTransforms || fftSize,
                  [ProcessorParameters.windowFunction]: windowFunction,
              }
          });
          this.port.onmessage = (event) => this._onmessage(event.data);
      }
      _uniqId() {
          return this._portMapId++;
      }
      _postMessage(message, transfer) {
          this.port.postMessage(message, transfer);
      }
      onprocessorerror = (err) => {
          console.log(`An error from AudioWorkletProcessor.process() occurred: ${err}`);
      };
      _onmessage(event) {
          switch (event.type) {
              case MessageTypes.frequencyDataAvailable: {
                  this.dispatchEvent(new CustomEvent(EventListenerTypes.frequencydata, { detail: event.payload }));
                  break;
              }
              case MessageTypes.byteFrequencyDataAvailable: {
                  this.dispatchEvent(new CustomEvent(EventListenerTypes.bytefrequencydata, { detail: event.payload }));
                  break;
              }
              case MessageTypes.requestedFloatFrequencyDataAvailable: {
                  const { id, payload } = event;
                  const resolve = this._portMap.get(id);
                  this._portMap.delete(id);
                  resolve(payload);
                  break;
              }
          }
      }
      getFloatFrequencyData() {
          return new Promise(resolve => {
              const id = this._uniqId();
              this._portMap.set(id, (buffer) => resolve(new Float32Array(buffer)));
              this._postMessage({
                  id,
                  type: MessageTypes.getFloatFrequencyData,
              });
          });
      }
      start() {
          this.parameters.get('isRecording').setValueAtTime(1, this.context.currentTime);
      }
      _pushEventListener(type, listener) {
          const listeners = this._eventListenersCount[type];
          listeners.push(listener);
          if (listeners.length === 1) {
              this._postMessage({
                  type: MessageTypes.startedListeningTo,
                  payload: type
              });
          }
      }
      _removeEventListener(type, listener) {
          const listeners = this._eventListenersCount[type];
          const index = listeners.indexOf(listener);
          if (index === -1)
              return;
          listeners.splice(index, 1);
          if (listeners.length === 0) {
              this._postMessage({
                  type: MessageTypes.stoppedListeningTo,
                  payload: type
              });
          }
      }
      addEventListener(type, listener, options) {
          super.addEventListener(type, listener, options);
          if (type !== 'processorerror' && typeof this._eventListenersCount[type] !== 'undefined')
              this._pushEventListener(type, listener);
      }
      removeEventListener(type, listener, options) {
          super.removeEventListener(type, listener, options);
          if (type !== 'processorerror' && typeof this._eventListenersCount[type] !== 'undefined')
              this._removeEventListener(type, listener);
      }
  }
  const createAdvancedAnalyserNode = async (context, options) => {
      const processorUrl = 'data:application/javascript;base64,' + processor;
      await context.audioWorklet.addModule(processorUrl);
      const advancedAnalyser = new AdvancedAnalyserNode(context, {
          ...options,
      });
      return advancedAnalyser;
  };

  exports.AdvancedAnalyserNode = AdvancedAnalyserNode;
  exports.createAdvancedAnalyserNode = createAdvancedAnalyserNode;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
