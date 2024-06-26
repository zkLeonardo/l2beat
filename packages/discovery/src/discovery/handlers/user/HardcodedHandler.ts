import { z } from 'zod'

import { DiscoveryLogger } from '../../DiscoveryLogger'
import { ClassicHandler, HandlerResult } from '../Handler'

export type HardCodedDefinition = z.infer<typeof HardCodedDefinition>
export const HardCodedDefinition = z.strictObject({
  type: z.literal('hardcoded'),
  value: z.any(),
})

export class HardCodedHandler implements ClassicHandler {
  readonly dependencies: string[] = []

  constructor(
    readonly field: string,
    private readonly definition: HardCodedDefinition,
    readonly logger: DiscoveryLogger,
  ) {}

  // biome-ignore lint/suspicious/useAwait: this is a handler
  async execute(): Promise<HandlerResult> {
    return {
      field: this.field,
      value: this.definition.value,
    }
  }
}
