export interface HostStat {
  name: string
  alias: string

  type: string
  location: string
  notify: boolean
  vnstat: boolean

  online4: boolean
  online6: boolean

  uptime: string

  load_1: number
  load_5: number
  load_15: number

  ping_10010: number // loss (中国联通) (percentage)
  ping_189: number // loss (中国电信) (percentage)
  ping_10086: number // loss (中国移动) (percentage)
  time_10010: number // ping (中国联通) (ms)
  time_189: number // ping (中国电信) (ms)
  time_10086: number // ping (中国移动) (ms)

  tcp_count: number
  udp_count: number
  process_count: number
  thread_count: number

  network_rx: number // speed in
  network_tx: number // speed out
  network_in: number // flow in
  network_out: number // flow out
  last_network_in: number // flow in, at the end of the last month
  last_network_out: number // flow out, at the end of the last month

  cpu: number // cpu usage (percentage)
  memory_total: number
  memory_used: number
  swap_total: number
  swap_used: number
  hdd_total: number
  hdd_used: number

  labels: string
  custom: string

  gid: string
  weight: number

  latest_ts: number // updated at (timestamp)

  si: boolean // toggle SI unit
}

export interface StatsResp {
  updated: number // (timestamp)
  servers: HostStat[]
}
