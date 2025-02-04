import React, { useState } from 'react';
import { withModal, Modal } from 'react-a11y-modal';
import { ReactComponent as Close } from '../../assets/icons/close.svg';
import '../../assets/styles/examples/SignInModal.scss';

const formState = [
  {
    name: 'username',
    label: 'Username',
    value: '',
    autoComplete: 'username'
  },
  {
    name: 'password',
    label: 'Password',
    value: '',
    type: 'password',
    autoComplete: 'current-password'
  }
];

const FormModal = ({ onAfterClose }) =>
  withModal(
    () => {
      const [fields, setFormFields] = useState(formState);
      const onFieldChange = event => {
        const { name, value } = event.target;
        let state = fields.slice(0);
        state = state.map(item =>
          item.name === name
            ? {
                ...item,
                value
              }
            : item
        );

        setFormFields(state);
      };
      const getFieldByName = name => fields.find(item => item.name === name);
      const Username = getFieldByName('username');
      const Password = getFieldByName('password');
      const hasInput = Username.value.length && Password.value.length;

      return (
        <>
          <Modal.Header>
            {({ actions }) => (
              <>
                <strong className="ModalHeader__title">Sign in</strong>
                <button
                  tabIndex="0"
                  aria-label="Close"
                  onClick={actions.close}
                  className="CloseButton"
                >
                  <Close className="CloseButton__icon" />
                </button>
              </>
            )}
          </Modal.Header>
          <Modal.Body>
            <form className="Form" autoComplete="off">
              {fields &&
                fields.map(({ name, label, value, ...attr }, idx) => (
                  <div key={name} className="Form__row">
                    <label className="Form__label">
                      {label}
                      <input
                        tabIndex={idx + 1}
                        name={name}
                        value={value}
                        onChange={onFieldChange}
                        className="Form__input"
                        {...attr}
                      />
                    </label>
                  </div>
                ))}
            </form>
          </Modal.Body>
          <Modal.Footer>
            {({ actions }) => (
              <button
                disabled={!hasInput}
                onClick={actions.close}
                className={`
              Form__button
              ${!hasInput ? 'Form__button--disabled' : ''}
            `}
              >
                Sign in
              </button>
            )}
          </Modal.Footer>
        </>
      );
    },
    {
      className: {
        'Modal--form': true
      },
      styles: {
        backdrop: {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,.3)',
          opacity: 0,
          transition: 'all .2s ease'
        },
        backdropAfterMount: {
          opacity: 0.2
        },
        backdropBeforeUnmount: {
          transitionDelay: '.35s',
          opacity: 0
        },
        container: {
          opacity: 0,
          transition: 'all .35s ease .2s',
          transform: 'translateY(-40%)'
        },
        containerAfterMount: {
          opacity: 1,
          transform: 'translateY(-50%)'
        },
        containerBeforeUnmount: {
          opacity: 0,
          transitionDelay: '0ms',
          transform: 'translateY(-40%)'
        }
      },
      waitUntilUnmountInMs: 450,
      onAfterClose
    }
  );

export default FormModal;
