import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IProject } from 'app/shared/model/project.model';
import { getEntities as getProjects } from 'app/entities/project/project.reducer';
import { getEntity, updateEntity, createEntity, reset } from './volunteer-request.reducer';
import { IVolunteerRequest } from 'app/shared/model/volunteer-request.model';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVolunteerRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IVolunteerRequestUpdateState {
  isNew: boolean;
  userId: string;
  projectId: string;
}

export class VolunteerRequestUpdate extends React.Component<IVolunteerRequestUpdateProps, IVolunteerRequestUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      projectId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getProjects();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { volunteerRequestEntity } = this.props;
      const entity = {
        ...volunteerRequestEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/volunteer-request');
  };

  render() {
    const { volunteerRequestEntity, users, projects, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="volunteerApp.volunteerRequest.home.createOrEditLabel">
              <Translate contentKey="volunteerApp.volunteerRequest.home.createOrEditLabel">Create or edit a VolunteerRequest</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : volunteerRequestEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="volunteer-request-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="volunteer-request-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="registrationDateLabel" for="volunteer-request-registrationDate">
                    <Translate contentKey="volunteerApp.volunteerRequest.registrationDate">Registration Date</Translate>
                  </Label>
                  <AvField id="volunteer-request-registrationDate" type="date" className="form-control" name="registrationDate" />
                </AvGroup>
                <AvGroup>
                  <Label for="volunteer-request-user">
                    <Translate contentKey="volunteerApp.volunteerRequest.user">User</Translate>
                  </Label>
                  <AvInput id="volunteer-request-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.login}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="volunteer-request-project">
                    <Translate contentKey="volunteerApp.volunteerRequest.project">Project</Translate>
                  </Label>
                  <AvInput id="volunteer-request-project" type="select" className="form-control" name="project.id">
                    <option value="" key="0" />
                    {projects
                      ? projects.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/volunteer-request" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  projects: storeState.project.entities,
  volunteerRequestEntity: storeState.volunteerRequest.entity,
  loading: storeState.volunteerRequest.loading,
  updating: storeState.volunteerRequest.updating,
  updateSuccess: storeState.volunteerRequest.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getProjects,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolunteerRequestUpdate);
