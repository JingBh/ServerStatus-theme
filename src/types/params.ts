/**
 * Params for the client one-click deployment script
 */
export interface ClientParams {
  uid?: string
  gid?: string
  pass: string
  vnstat?: boolean
  ping?: false // this theme disables ping
  tupd?: boolean
  extra?: boolean
  notify?: boolean
  'alias'?: string
  'type'?: string
  loc?: string
  interval?: number
}
