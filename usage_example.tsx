import { message } from '@core/i18n/src/messages'
import { Button, Col, ModalContent, ModalFooter, ModalHeader, Row, useModal } from '@mmb-digital/ds-lilly'
import React, { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

export interface UsageExampleProps {
}

export function UsageExample(props: UsageExampleProps) {
  const intl = useIntl()

  const {
    Modal: LogoutModalWrapper,
    hide: hideInactivityDialog,
    modalProps: logoutModalProps,
    show: handleShowInactivityModal
  } = useModal(true, () => {
    clearLogoutTimeout()
      // Do something
  })

  const onClickLogout = (): void => {
    dispatchLogout()
  }

  const onClickContinue = (): void => {
    hideInactivityDialog()
  }

  useEffect(() => {
    // Check inactive user, then =>
    handleShowInactivityModal()
  }, [])

  return (
    <LogoutModalWrapper {...logoutModalProps}>
      <ModalHeader
        closeText={intl.formatMessage({ id: message.common.misc.close })}
        theme="u-pt--xLarge"
        title={intl.formatMessage({ id: message.inactivity.title })}
      />
      <ModalContent>
        <FormattedMessage id={message.inactivity.detail} />
      </ModalContent>
      <ModalFooter>
        <Row theme="u-mb--0">
          <Col>
            <Button testId="stop-work" type="border" onClick={onClickLogout}>
              <FormattedMessage id={message.inactivity.btnNo} />
            </Button>
          </Col>
          <Col theme="u-textRight">
            <Button testId="continue-work" onClick={onClickContinue}>
              <FormattedMessage id={message.inactivity.btnYes} />
            </Button>
          </Col>
        </Row>
      </ModalFooter>
    </LogoutModalWrapper>
  )
}
