import { promisify } from 'util'
import { exec as realExec } from 'child_process'

export const exec = promisify(realExec)
