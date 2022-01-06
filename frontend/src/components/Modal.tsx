import React, { useEffect } from 'react'

import ReactDOM from 'react-dom'

import '../styles/Modal.css'
import { Container } from './Container'
import { CSSTransition } from 'react-transition-group'
import { Cross } from './Cross'

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  show: boolean,
  onClose: () => void,
}

export function Modal ({ show, onClose, children }: ModalProps) {
  const root = document.getElementById('root')

  if (root === null) return null

  const closeOnEscapeDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeDown)
    return function cleanUp () {
      document.body.removeEventListener('keydown', closeOnEscapeDown)
    }
  }, [])

  return ReactDOM.createPortal(<CSSTransition
    in={show}
    unmountOnExit
    timeout={{ enter: 0, exit: 300 }}
  >
    <div onClick={onClose} className="modal">
      <Container onClick={e => e.stopPropagation()} className="modalContent">
        <div className="modalHeader" >
          <Cross onClick={onClose} />
        </div>
        <div>
          {children}
        </div>
      </Container>
    </div>
  </CSSTransition>, root)
}