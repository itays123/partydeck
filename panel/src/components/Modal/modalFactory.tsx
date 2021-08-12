import { Context } from 'react';
import { action } from '../buttonFactory';
import { createWrapper } from '../logicalWrapeprFactory';
import { ModalHook } from './types';
import Clear from '../icons/Clear';

export function createModal<T extends object>(
  context: Context<T>,
  name: keyof T,
  openerLabel: string
) {
  return {
    Visible: createWrapper(
      context,
      ctx => (ctx[name] as unknown as ModalHook).isOpen
    ),
    Opener: action(openerLabel, context, ctx =>
      (ctx[name] as unknown as ModalHook).open()
    ),
    Closer: action(Clear, context, ctx =>
      (ctx[name] as unknown as ModalHook).close()
    ),
  };
}
