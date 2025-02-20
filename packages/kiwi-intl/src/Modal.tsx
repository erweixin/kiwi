import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  title: string;
  content: React.ReactNode;
  onOk: () => void;
  onCancel: () => void;
  okText?: string;
  cancelText?: string;
}

const Modal = {
  confirm: ({ title, content, onOk, onCancel, okText = '确认', cancelText = '取消' }: ModalProps) => {
    // 创建一个 div 作为 modal 的容器
    const modalRoot = document.createElement('div');
    modalRoot.className = 'kiwi-modal-root';
    document.body.appendChild(modalRoot);

    const closeModal = () => {
      document.body.removeChild(modalRoot);
    };

    const handleOk = () => {
      onOk();
      closeModal();
    };

    const handleCancel = () => {
      onCancel();
      closeModal();
    };

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
      .kiwi-modal-root {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
      .kiwi-modal {
        background: white;
        padding: 20px;
        border-radius: 4px;
        min-width: 400px;
      }
      .kiwi-modal-header {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 16px;
      }
      .kiwi-modal-content {
        margin-bottom: 16px;
      }
      .kiwi-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 8px;
      }
      .kiwi-modal-button {
        padding: 4px 15px;
        border-radius: 2px;
        border: 1px solid #d9d9d9;
        cursor: pointer;
      }
      .kiwi-modal-button-primary {
        background: #1890ff;
        color: white;
        border-color: #1890ff;
      }
    `;
    document.head.appendChild(style);

    const modalContent = (
      <div className="kiwi-modal">
        <div className="kiwi-modal-header">{title}</div>
        <div className="kiwi-modal-content">{content}</div>
        <div className="kiwi-modal-footer">
          <button className="kiwi-modal-button" onClick={handleCancel}>
            {cancelText}
          </button>
          <button className="kiwi-modal-button kiwi-modal-button-primary" onClick={handleOk}>
            {okText}
          </button>
        </div>
      </div>
    );

    ReactDOM.render(modalContent, modalRoot);
  }
};

export { Modal };
