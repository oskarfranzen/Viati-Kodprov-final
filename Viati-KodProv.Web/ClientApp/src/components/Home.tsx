import React, { useEffect, useState, useMemo } from 'react';
import { IMusicService, IMusicServiceFilter } from '../services/musicService';
import { Col, Spinner, Alert } from 'reactstrap';
import { LabelDetails } from './LabelComponents/LabelDetails'
import { Route, Switch } from 'react-router';
import { LabelSummary } from './LabelComponents/LabelSummary'
import commons from '../commons/commons';
import { ILabelDTO } from '../services/contracts/labelResponse.contract'

interface IHomeProps {
  musicService: IMusicService;
}

interface IHomeState {
  labels: ILabelDTO[],
  isLoading: boolean,
  unexpectedError: boolean
}

const initialState: IHomeState = {
  labels: [],
  isLoading: false,
  unexpectedError: false
}

const initialFilter: IMusicServiceFilter = {
  startDate: new Date(),
  searchString: '',
  sortDescending: true
}

export const Home: React.FunctionComponent<IHomeProps> = ({ musicService }) => {
  const [state, setState] = useState<IHomeState>(initialState);

  const [filter, setFilter] = useState<IMusicServiceFilter>(initialFilter)

  useEffect(() => {
    setState({ ...state, isLoading: true })
    musicService.getLabelsWithDate(filter.startDate)
      .then(data => {
        setState({
          ...state,
          labels: commons.helpers.sortByLabelName(data, false),
          isLoading: false
        })
        setFilter({ ...filter, sortDescending: false })
      })
      .catch(error => setState({ ...state, unexpectedError: true }))
  }, [filter.startDate])

  const onUpdateSearchString = (searchString: string) => {
    if (searchString !== filter.searchString) {
      setFilter({
        ...filter,
        searchString: searchString
      })
    }
  }

  const onUpdateStartDate = (date: Date) => {
    setFilter({ ...filter, startDate: date });
  }

  const onSetSort = (setDescending: boolean) => {
    if (setDescending === filter.sortDescending) return;

    setFilter({ ...filter, sortDescending: setDescending })

    const sortedList = [...state.labels]
    commons.helpers.sortByLabelName(sortedList, setDescending)

    setState({
      ...state,
      labels: sortedList
    });
  }

  const filteredLabels = useMemo(
    () => commons.helpers.createFilteredSet(state.labels, filter.searchString),
    [filter.searchString, state.labels]
  );

  return (
    <>
      {state.unexpectedError && (
        <Alert color='danger'>Something went wrong!</Alert>
      )}
      {!state.unexpectedError && state.isLoading &&
        <Col xs={{ size: 3, offset: 5 }} className='p-5'>
          <Spinner style={{ width: '5rem', height: '5rem' }} color='primary' />
        </Col>
      }
      {!state.unexpectedError && !state.isLoading && (
        <Switch>
          <Route exact path={commons.constants.labelPath + ':id'} render={({ match }) => {
            const id = decodeURIComponent(match.params.id);
            const labelDetail = commons.helpers.findLabelByName(state.labels, id);
            return <LabelDetails label={labelDetail} />
          }}
          />
          <Route path='/'>
            <LabelSummary
              labels={filteredLabels}
              onUpdateSearchString={onUpdateSearchString}
              onUpdateStartDate={onUpdateStartDate}
              onSetSort={onSetSort}
              filter={filter} />
          </Route>
        </Switch>
      )}
    </>
  )
}
