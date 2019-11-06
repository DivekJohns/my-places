export class Notification {

  constructor(
    public id: number,
    public type: string,
    public message: string,
    public timeout: number,
  ) { }

}

export enum NotificationType {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}