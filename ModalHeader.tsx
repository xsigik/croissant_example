import React, { ReactElement, useContext } from 'react'

import { Button, ComponentPropsType, cx, Title, TitleSize, useEventListener } from '../../../'
import { ModalContext } from '../../../contexts'
import { UseEventListenerHandlerType } from '../../../utils'

export interface ModalHeaderPropsType extends ComponentPropsType {
  /** Exit button text. */
  closeText: string | ReactElement
  /** Flag to hide close button. */
  isCloseHidden?: boolean
  /** Flag to hide title (only visually). */
  isTitleHidden?: boolean
  /** Header of whole modal box. */
  title: string | ReactElement
  /** Size of title. Used for it's basic purpose = defining page navigation priority. Please follow standard **[rules](https://www.w3.org/WAI/test-evaluate/preliminary/#headings)**. */
  titleSize?: TitleSize
  /** Title visual size. Use this for matching title visual with desired design. */
  titleVisual?: TitleSize
}

export const ModalHeader = ({
  closeText,
  isCloseHidden = false,
  isTitleHidden = false,
  testId,
  theme,
  title,
  titleSize = 'h2',
  titleVisual = 'h3'
}: ModalHeaderPropsType): JSX.Element => {
  const { hide: onHide } = useContext(ModalContext)
  const { identification } = useContext(ModalContext)
  const handleEscPress = ({ key }: KeyboardEvent) => key === 'Escape' && onHide()

  useEventListener('keydown', handleEscPress as UseEventListenerHandlerType)

  return (
    <header className={cx('c-modal__header', theme)} data-testid={testId}>
      <Title
        id={`${identification}_title`}
        size={titleSize}
        theme={cx('c-modal__title', { 'u-vHide': isTitleHidden })}
        visual={titleVisual}
      >
        {title}
      </Title>

      {!isCloseHidden && (
        <Button
          isSmall
          ariaLabel={closeText}
          onlyIconName="close"
          theme={cx('c-modal__close')}
          type="transparent"
          onClick={onHide}
        />
      )}
    </header>
  )
}
