import { partial } from 'filesize'

import { HostStat } from '../types/stats.ts'

export const formatSize = partial({
  base: 2,
  round: 1,
  standard: 'jedec'
})

export const formatNetworkSpeed = (v: number): string => {
  let res = formatSize(v * 8)
  return res.substring(0, res.length - 1) + 'bps'
}

export const isOnline = (stats: HostStat, updated?: number): boolean => {
  if (!updated) {
    updated = Date.now() / 1000
  }

  // when a server don't report for 60 seconds, it's considered offline
  return (updated - stats.latest_ts) < 60
}

export const getMemoryPercentage = (stats: HostStat): number => {
  return Math.round(stats.memory_used / stats.memory_total * 100)
}

export const getMemoryText = (stats: HostStat): string => {
  const memoryUsed = formatSize(stats.memory_used * (stats.si ? 1000 : 1024))
  const memoryTotal = formatSize(stats.memory_total * (stats.si ? 1000 : 1024))

  return `${memoryUsed} / ${memoryTotal}`
}

export const getSwapPercentage = (stats: HostStat): number => {
  return Math.min(Math.round(stats.swap_used / stats.memory_total * 100), 100 - getMemoryPercentage(stats))
}

export const getSwapText = (stats: HostStat): string => {
  const swapUsed = formatSize(stats.swap_used * (stats.si ? 1000 : 1024))
  const swapTotal = formatSize(stats.swap_total * (stats.si ? 1000 : 1024))

  return `${swapUsed} / ${swapTotal}`
}

export const getDiskPercentage = (stats: HostStat): number => {
  return Math.round(stats.hdd_used / stats.hdd_total * 100)
}

export const getDiskText = (stats: HostStat): string => {
  const diskUsed = formatSize(stats.hdd_used * Math.pow(stats.si ? 1000 : 1024, 2))
  const diskTotal = formatSize(stats.hdd_total * Math.pow(stats.si ? 1000 : 1024, 2))

  return `${diskUsed} / ${diskTotal}`
}
