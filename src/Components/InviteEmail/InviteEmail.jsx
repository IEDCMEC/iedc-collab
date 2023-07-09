import React from 'react';
import PropTypes from 'prop-types';
import { mainUrl } from '../../Utils/urls';

function InviteEmail({ data, member }) {
  return (
    <div>
      <p>{`Hi ${member} , `}</p>
      <p
        style={{
          paddingLeft: '1.5rem',
        }}
      >
        <b>{data.leader_name}</b>
        has added you to their team for the project
        {'  '}
        <i>
          <a
            href={
              data.id
                ? `${mainUrl}/projects/${data.id}`
                : `${mainUrl}/projects/`
            }
            target="_blank"
            rel="noreferrer"
          >
            {data.name}
          </a>
        </i>{' '}
        . Login to{' '}
        <a href={mainUrl} target="_blank" rel="noreferrer">
          IEDC Collab
        </a>{' '}
        to check out.
      </p>
      <br />
      <div>
        <p>
          To view more details , Vist{' '}
          <a href={mainUrl} target="_blank" rel="noreferrer">
            {mainUrl}
          </a>
        </p>
      </div>
      <p>Regards</p>
      <p>IEDC MEC Collab Team</p>
      <br />
      <p>
        NOTE : This is an auto generated email.Please DO NOT REPLY to this mail.
      </p>
      <p>
        <i>
          For any queries please visit{' '}
          <a href="https://www.iedcmec.in">https://www.iedcmec.in</a>
        </i>
      </p>
    </div>
  );
}

InviteEmail.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    leader_name: PropTypes.string.isRequired,
  }).isRequired,

  member: PropTypes.string.isRequired,
};

export default InviteEmail;
