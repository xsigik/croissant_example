import React, { createContext, createRef } from 'react'

const noop = () => null

export interface ModalContextType {
  /** If `true`, modal can be closed only by action buttons. */
  disableDefaultCloseBehavior: boolean
  /** Unique identification of modal. */
  identification: string
  /** If `true` modal is focused for keyboard navigation. */
  isFocused: boolean
  /** If `true` modal si visible. */
  isVisible: boolean
  /** Callback for hide action. */
  hide: () => void
  /** Callback for show action. */
  show: () => void
  /** Internal reference to modal. */
  reference: React.RefObject<HTMLDivElement>
}

const ModalContext = createContext<ModalContextType>({
  disableDefaultCloseBehavior: false,
  identification: '',
  isFocused: false,
  isVisible: false,
  hide: noop,
  show: noop,
  reference: createRef()
})

ModalContext.displayName = 'ModalContext'

export default ModalContext
