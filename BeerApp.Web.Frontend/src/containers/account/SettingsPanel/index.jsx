import React, { Component } from 'react';
import { connect } from 'react-redux';

import { ErrorField, DatePicker } from '../../../components';

import { getUser } from '../../../reducers/account';

import './settings-modal.css';
import './profile-settings.css';
import '../../../components/common/styles/user-avatar.css';

const mapStateToProps = state => ({
    user: getUser(state)
});

export class SettingsPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarUrl: props.user.avatarUrl,
            errors: null
        };
    }

    render() {
        return (
            <section className="container settings-modal has-text-centered">
                <h3 className="title has-text-grey settings-modal__title">Profile</h3>
                <p className="subtitle has-text-grey settings-modal__subtitle">
                    B e e r C a t a l o g
                </p>
                <div className="box settings-modal__profile-settings">
                    {this.renderErrorField()}
                    <div className="profile-settings">
                        <div className="profile-settings__avatar-settings">
                            {this.renderAvatar()}
                            {this.renderUploadButton()}
                        </div>
                        <div className="profile-settings__user-info-settings">
                            {this.renderUserInfo()}
                        </div>
                    </div>
                </div>
                <button
                    className="button is-large profile-settings__save-button"
                    onClick={this.handleSaveClick}
                >
                    Save
                </button>
            </section>
        );
    }

    renderErrorField = () => (
        <ErrorField errors={this.state.errors}/>
    )

    renderAvatar = () => (
        this.state.avatarUrl
            ? (
                <img
                    className="user-avatar user-avatar--200x200 profile-settings__avatar"
                    src={this.state.avatarUrl}
                    alt="avatar"
                />
            )
            : <div className="user-avatar user-avatar--200x200 profile-settings__avatar"/>
    )

    renderUploadButton = () => (
        <div className="file is-centered">
            <label className="file-label">
                <input
                    ref={(node) => { this.imageInput = node; }}
                    className="file-input"
                    type="file"
                    accept="image/*"
                    onChange={this.handleAvatarChange}
                />
                <span className="file-cta">
                    <span className="file-label">
                        Upload
                    </span>
                </span>
            </label>
        </div>
    )

    renderUserInfo = () => (
        <table className="table has-text-grey">
            <tbody>
                <tr>
                    <td className="is-bold">Nick name</td>
                    <td>{this.props.user.nickName}</td>
                </tr>
                <tr>
                    <td className="is-bold">Email</td>
                    <td>{this.props.user.email}</td>
                </tr>
                <tr>
                    <td className="is-bold">Birth date</td>
                    <td>{this.renderBirthDateSettings()}</td>
                </tr>
            </tbody>
        </table>
    )

    renderBirthDateSettings() {
        const birthDate = new Date(this.props.user.birthDate);

        return (
            <DatePicker
                date={birthDate}
                ref={(node) => { this.datePicker = node; }}
            />
        );
    }

    handleAvatarChange = () => {
        this.setImageToAvatarPreview();
    }

    setImageToAvatarPreview() {
        if (!this.imageInput.files) {
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ avatarUrl: e.target.result });
        };
        reader.readAsDataURL(this.imageInput.files[0]);
    }

    handleSaveClick = () => {
        const { day, month, year } = this.datePicker.state;

        const birthDate = new Date();

        // TODO: send valid data on server
    }
}

export default connect(mapStateToProps)(SettingsPanel);
