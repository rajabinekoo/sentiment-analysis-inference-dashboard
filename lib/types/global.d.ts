interface childrenProps {
  children:
    | React.JSX.Element
    | Array<React.JSX.Element>
    | React.ReactNode
    | Array<React.ReactNode>;
}

interface IPagination {
  cursor: string;
  limit: number;
}

interface IListResponse<T> {
  cursor: string;
  list: Array<T>;
}

interface IServerError {
  error: string;
  message: string;
  statusCode: number;
}
