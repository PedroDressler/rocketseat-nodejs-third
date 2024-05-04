export interface UseCase<Request, Response> {
  handle: (data: Request) => Promise<Response>
}
