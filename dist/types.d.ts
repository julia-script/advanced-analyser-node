export declare enum MessageTypes {
    start = 0,
    stop = 1,
    frequencyDataAvailable = 2,
    byteFrequencyDataAvailable = 3,
    getFloatFrequencyData = 4,
    requestedFloatFrequencyDataAvailable = 5,
    getByteFrequencyData = 6,
    requestedByteFrequencyDataAvailable = 7,
    getFloatTimeDomainData = 8,
    requestedFloatTimeDomainDataAvailable = 9,
    getByteTimeDomainData = 10,
    requestedByteTimeDomainDataAvailable = 11,
    startedListeningTo = 12,
    stoppedListeningTo = 13
}
interface BasicMessage<T, P = unknown> {
    type: T;
    payload?: P;
}
interface IdentifiedMessage<T, P = unknown> extends BasicMessage<T, P> {
    id: number;
}
declare type FloatFrequencyDataAvailableMessage = BasicMessage<MessageTypes.frequencyDataAvailable, Float32Array>;
declare type ByteFrequencyDataAvailableMessage = BasicMessage<MessageTypes.byteFrequencyDataAvailable, Uint8Array>;
declare type GetFloatFrequencyDataMessage = IdentifiedMessage<MessageTypes.getFloatFrequencyData>;
declare type RequestedFloatFrequencyDataAvailableMessage = IdentifiedMessage<MessageTypes.requestedFloatFrequencyDataAvailable, ArrayBuffer>;
declare type GetByteFrequencyDataMessage = IdentifiedMessage<MessageTypes.getByteFrequencyData, Uint8Array>;
declare type RequestedByteFrequencyDataAvailableMessage = IdentifiedMessage<MessageTypes.requestedByteFrequencyDataAvailable, ArrayBuffer>;
declare type GetFloatTimeDomainDataMessage = IdentifiedMessage<MessageTypes.getFloatTimeDomainData>;
declare type RequestedFloatTimeDomainDataAvailableMessage = IdentifiedMessage<MessageTypes.requestedFloatTimeDomainDataAvailable, ArrayBuffer>;
declare type GetByteTimeDomainDataMessage = IdentifiedMessage<MessageTypes.getByteTimeDomainData, Uint8Array>;
declare type RequestedByteTimeDomainDataAvailableMessage = IdentifiedMessage<MessageTypes.requestedByteTimeDomainDataAvailable, ArrayBuffer>;
declare type StartedListeningToMessage = BasicMessage<MessageTypes.startedListeningTo, EventListenerTypes>;
declare type StoppedListeningToMessage = BasicMessage<MessageTypes.stoppedListeningTo, EventListenerTypes>;
export declare type Message = FloatFrequencyDataAvailableMessage | ByteFrequencyDataAvailableMessage | GetFloatFrequencyDataMessage | RequestedFloatFrequencyDataAvailableMessage | GetByteFrequencyDataMessage | RequestedByteFrequencyDataAvailableMessage | GetFloatTimeDomainDataMessage | RequestedFloatTimeDomainDataAvailableMessage | GetByteTimeDomainDataMessage | RequestedByteTimeDomainDataAvailableMessage | StartedListeningToMessage | StoppedListeningToMessage;
export declare enum ProcessorParameters {
    fftSize = "fftSize",
    samplesBetweenTransforms = "samplesBetweenTransforms",
    dataAsByteArray = "dataAsByteArray",
    windowFunction = "windowFunction"
}
export declare enum EventListenerTypes {
    frequencydata = "frequencydata",
    bytefrequencydata = "bytefrequencydata",
    timedomaindata = "timedomaindata",
    bytetimedomaindata = "bytetimedomaindata"
}
export declare enum WindowingFunctionTypes {
    none = "none",
    blackmanWindow = "blackmanWindow"
}
export {};