import { hashJson } from '@l2beat/shared'
import { sortBy } from 'lodash'

import { ReportProject } from './ReportProject'

// Increment this value to change the hash which in turn causes the system to
// recalculate reports
// Last updated because: updated OP token balance
const REPORT_LOGIC_VERSION = 3

export function getReportConfigHash(projects: ReportProject[]) {
  return hashJson([getEntries(projects), REPORT_LOGIC_VERSION])
}

export function getEntries(projects: ReportProject[]) {
  const entries = []
  for (const { projectId, escrows, type, isUpcoming, isLayer3 } of projects) {
    for (const { tokens, address, sinceTimestamp } of escrows) {
      for (const token of tokens) {
        entries.push({
          projectId: projectId.toString(),
          type,
          holder: address.toString(),
          holderSinceTimestamp: sinceTimestamp.toNumber(),
          assetId: token.id.toString(),
          assetSinceTimestamp: token.sinceTimestamp.toNumber(),
          isUpcoming: Boolean(isUpcoming),
          isLayer3: Boolean(isLayer3),
        })
      }
    }
  }
  return sortBy(entries, ['projectId', 'holder', 'assetId'])
}
