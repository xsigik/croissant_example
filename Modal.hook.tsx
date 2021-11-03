import cuid from 'cuid'
import { createRef, useEffect, useMemo, useState } from 'react'

import { ModalContextType } from '../../../contexts'
import { KEYS, useEventListener, UseEventListenerHandlerType } from '../../../utils'
import { Modal, ModalPropsType } from './Modal'

export interface ModalHookType {
  /** Functions to hide modal dialog. */
  hide: () => void
  /** Function for display modal dialog. */
  show: () => void
  /** Visibility flag of inner modal dialog. */
  isVisible: boolean
  /** Fabric component. */
  Modal: ({ children, size, theme }: ModalPropsType) => JSX.Element
  /** Internal props thats need to pe passed to <Modal> component. */
  modalProps: ModalContextType
}

const focusableModalElementsSelector =
  'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'

/**
 * @param disableCloseByOutsideClick Disable closing dialog by clicks outside popUp.
 * @param onHide  Custom functions to be called together with internal handle hide
 * @param onShow  Custom functions to be called together with internal handle show
 */
export const useModal = (
  disableCloseByOutsideClick = false,
  onHide?: () => void,
  onShow?: () => void
): ModalHookType => {
  const identification = useMemo(() => `modal_${cuid()}`, [])
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const reference = createRef<HTMLDivElement>()

  const addBodyClass = (className: string) => document.body.classList.add(className)
  const removeBodyClass = (className: string) => document.body.classList.remove(className)

  const handleHideWithCallbacks = () => {
    onHide && onHide()
    setIsVisible(false)
  }

  const handleShowWithCallbacks = () => {
    onShow && onShow()
    setIsVisible(true)
  }

  const handleTabKey = (event: KeyboardEvent) => {
    const focusableModalElements = reference.current?.querySelectorAll<HTMLElement>(focusableModalElementsSelector)

    const activeElementPos = focusableModalElements
      ? Array.from(focusableModalElements).findIndex((element) => element === document.activeElement)
      : 0

    if (!isFocused) {
      setIsFocused(true)
      focusableModalElements && focusableModalElements[activeElementPos + 1].focus()
      event.preventDefault()
    }

    if (focusableModalElements && focusableModalElements.length > 0) {
      const firstElement = focusableModalElements[0]
      const lastElement = focusableModalElements[focusableModalElements.length - 1]

      const { shiftKey } = event
      const { activeElement } = document

      if (!shiftKey && activeElement === lastElement) {
        firstElement.focus()
        event.preventDefault()
      }

      if (shiftKey && activeElement === firstElement) {
        lastElement.focus()
        event.preventDefault()
      }
    }
  }

  const handleEscKey = () => {
    !disableCloseByOutsideClick && handleHideWithCallbacks
  }

  const keyListenersMap = new Map([
    [KEYS.Escape, handleEscKey],
    [KEYS.Tab, handleTabKey]
  ])

  const keyDownListener = (event: KeyboardEvent) => {
    if (isVisible) {
      const listener = keyListenersMap.get(event.key)
      return listener && listener(event)
    }
  }

  const mouseDownListener = (event: MouseEvent) => {
    // Modal is visible and click is aimed on overlay
    if (isVisible && reference.current == event.target && !disableCloseByOutsideClick) {
      handleHideWithCallbacks()
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', mouseDownListener)

    return () => {
      window.removeEventListener('mousedown', mouseDownListener)
    }
  })

  useEffect(() => {
    const beforeActive = document.activeElement as HTMLElement

    if (isVisible) {
      addBodyClass('l-body--modalOpen')
      const focusableModalElements = reference.current?.querySelectorAll<HTMLElement>(focusableModalElementsSelector)
      focusableModalElements && focusableModalElements[0]?.focus()
    } else {
      removeBodyClass('l-body--modalOpen')
    }

    return () => {
      beforeActive?.focus()
      removeBodyClass('l-body--modalOpen')
    }
  }, [isVisible])

  useEventListener('keydown', keyDownListener as UseEventListenerHandlerType)

  const modalProps = {
    disableDefaultCloseBehavior: disableCloseByOutsideClick,
    isVisible,
    isFocused,
    reference,
    identification,
    hide: handleHideWithCallbacks,
    show: handleShowWithCallbacks
  }

  return {
    hide: handleHideWithCallbacks,
    show: handleShowWithCallbacks,
    isVisible,
    Modal,
    modalProps
  }
}
