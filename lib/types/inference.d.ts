interface IInferenceReqDTO {
  queries: Array<string>;
}

interface IInferenceResDTO {
  body: string;
  prediction: number;
}
