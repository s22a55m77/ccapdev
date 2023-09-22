import './index.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallMadeIcon from '@mui/icons-material/CallMade';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Button, Menu, MenuItem, Radio } from '@mui/material';
import { useEffect, useState } from 'react';
import RestroomCard from './components/RestroomCard.tsx';
import { getRestroomList } from '../../services/api.ts';

export default function Main() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(
    null,
  );
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorMenuEl);

  const [restroomList, setRestroomList] = useState<API.RestroomListData>(
    [],
  );

  // this control the params of getRestroomList
  const [query, setQuery] = useState<API.RestroomListQuery>({
    sort: 'NEW',
  });

  const handleFilterClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleFilterClose = () => {
    setAnchorEl(null);
    setAnchorMenuEl(null);
  };

  const handleMenuClick = () => {
    setAnchorMenuEl(anchorEl);
    setAnchorEl(null);
  };

  const handleBuildingRadioClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const building = (e.target as HTMLInputElement).value;

    if (building == selectedBuilding) {
      setSelectedBuilding('');
      setQuery({ ...query, building: undefined });
    } else {
      setSelectedBuilding(building);
      setQuery({ ...query, building });
    }
  };

  const handleFloorRadioClick = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const floor = (e.target as HTMLInputElement).value;

    if (floor == selectedFloor) {
      setSelectedFloor('');
      setQuery({ ...query, floor: undefined });
    } else {
      setSelectedFloor(floor);
      setQuery({ ...query, floor: Number(floor) });
    }
  };

  useEffect(() => {
    getRestroomList(query).then((data) => setRestroomList(data));
  }, [query]);

  return (
    <div className={'main-container'}>
      <div id={'tabs'} className={'flex'}>
        <button
          className={`tab-button ${
            query.sort === 'NEW' ? 'tab-button-active' : ''
          }`}
          onClick={() => setQuery({ ...query, sort: 'NEW' })}
        >
          <div style={{ display: 'flex' }}>
            <AccessTimeIcon
              fontSize={'inherit'}
              style={{ marginRight: 5 }}
            />
            New
          </div>
        </button>
        <button
          className={`tab-button ${
            query.sort === 'RATING' ? 'tab-button-active' : ''
          }`}
          onClick={() => setQuery({ ...query, sort: 'RATING' })}
        >
          <div style={{ display: 'flex' }}>
            <CallMadeIcon
              fontSize={'inherit'}
              style={{ marginRight: 5 }}
            />
            Top
          </div>
        </button>
        <button
          className={`tab-button ${
            query.building || query.floor ? 'tab-button-active' : ''
          }`}
          id="basic-button"
          onClick={handleFilterClick}
        >
          <div style={{ display: 'flex' }}>
            <FilterAltIcon
              fontSize={'inherit'}
              style={{ marginRight: 5 }}
            />{' '}
            Filter
          </div>
        </button>
      </div>

      {restroomList.map((restroom) => {
        return (
          <RestroomCard
            key={restroom.id}
            title={restroom.title}
            tags={restroom.tags}
            rating={restroom.rating}
            restroomImageIds={restroom.restroomImageIds}
            createdByUser={restroom.createdByUser}
            createdAt={restroom.createdAt}
            downVote={restroom.downVote}
            upVote={restroom.upVote}
            totalComments={restroom.totalComments}
            location={restroom.location}
          />
        );
      })}

      {/*  MENU Building*/}
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleFilterClose}
        PaperProps={{
          style: {
            padding: '0px',
            width: '200px',
          },
        }}
      >
        <MenuItem
          style={{
            padding: '0px',
          }}
        >
          <Radio
            checked={selectedBuilding === 'Gokongwei'}
            onClick={(e) => handleBuildingRadioClick(e)}
            name="building"
            value="Gokongwei"
            size="small"
          />
          <Button
            onClick={handleMenuClick}
            endIcon={<ArrowForwardIosIcon />}
            color={'green'}
            className={'menu-button'}
            style={{ justifyContent: 'end' }}
          >
            <span className={'text-wrap'}>Gokongwei Hall</span>
          </Button>
        </MenuItem>
        <MenuItem
          style={{
            padding: '0px',
          }}
        >
          <Radio
            checked={selectedBuilding === 'Razon'}
            onClick={(e) => handleBuildingRadioClick(e)}
            name="building"
            value="Razon"
            size="small"
          />
          <Button
            onClick={handleMenuClick}
            endIcon={<ArrowForwardIosIcon />}
            color={'green'}
            className={'menu-button'}
            style={{ justifyContent: 'end' }}
          >
            <span className={'text-wrap'}>Razon</span>
          </Button>
        </MenuItem>
        <MenuItem
          style={{
            padding: '0px',
          }}
        >
          <Radio
            checked={selectedBuilding === 'Henry Sy'}
            onClick={(e) => handleBuildingRadioClick(e)}
            name="building"
            value="Henry Sy"
            size="small"
          />
          <Button
            onClick={handleMenuClick}
            endIcon={<ArrowForwardIosIcon />}
            color={'green'}
            className={'menu-button'}
            style={{ justifyContent: 'end' }}
          >
            <span className={'text-wrap'}>Henry Sy</span>
          </Button>
        </MenuItem>
      </Menu>

      {/*  MENU Floor*/}
      <Menu
        id="filter-menu"
        anchorEl={anchorMenuEl}
        open={openMenu}
        onClose={handleFilterClose}
      >
        <MenuItem
          style={{
            padding: '0px',
            paddingLeft: '3px',
            paddingRight: '10px',
          }}
        >
          <Radio
            checked={selectedFloor === '1'}
            onClick={(e) => handleFloorRadioClick(e)}
            name="floor"
            value="1"
            size="small"
          />
          <span className={'green'}>1</span>
        </MenuItem>
        <MenuItem
          style={{
            padding: '0px',
            paddingLeft: '3px',
            paddingRight: '10px',
          }}
        >
          <Radio
            checked={selectedFloor === '2'}
            onClick={(e) => handleFloorRadioClick(e)}
            name="floor"
            value="2"
            size="small"
          />
          <span className={'green'}>2</span>
        </MenuItem>
        <MenuItem
          style={{
            padding: '0px',
            paddingLeft: '3px',
            paddingRight: '10px',
          }}
        >
          <Radio
            checked={selectedFloor === '3'}
            onClick={(e) => handleFloorRadioClick(e)}
            name="floor"
            value="3"
            size="small"
          />
          <span className={'green'}>3</span>
        </MenuItem>
      </Menu>
    </div>
  );
}
