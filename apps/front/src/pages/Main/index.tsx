import './index.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallMadeIcon from '@mui/icons-material/CallMade';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { motion } from 'framer-motion';
import { Button, Menu, MenuItem, Radio } from '@mui/material';
import { useEffect, useState } from 'react';
import RestroomCard from './components/RestroomCard.tsx';
import { getRestroomList } from '../../services/api.ts';
import { useRequest } from 'ahooks';
import buildingInfo from './buildingInfo.ts';

export default function Main() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorMenuEl, setAnchorMenuEl] = useState<null | HTMLElement>(
    null,
  );
  const [selectedBuilding, setSelectedBuilding] = useState<string>('');
  const [lastSelectedBuilding, setLastSelectedBuilding] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('');
  const open = Boolean(anchorEl);
  const openMenu = Boolean(anchorMenuEl);

  // this control the params of getRestroomList
  const [query, setQuery] = useState<API.RestroomListQuery>({
    sort: 'NEW',
  });

  // this is control the floor of the building in filter
  const [buildingFloorCount, setBuildingFloorCount] = useState(3);

  const {
    data: restroomList,
    run,
    error,
  } = useRequest(getRestroomList, {
    defaultParams: [query],
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

  const handleMenuClick = (selectedBuilding: string) => {
    setLastSelectedBuilding(selectedBuilding);
    setAnchorMenuEl(anchorEl);
    setAnchorEl(null);

    const matchBuilding = buildingInfo.find(
      (building) => building.buildingName === selectedBuilding,
    );

    if (matchBuilding) {
      setBuildingFloorCount(matchBuilding.maxFloor);
    }
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
      setQuery({ ...query, floor: undefined, building: undefined });
      setSelectedBuilding('');
    } else {
      setSelectedBuilding(lastSelectedBuilding);
      setSelectedFloor(floor);
      setQuery({
        ...query,
        floor: Number(floor),
        building: lastSelectedBuilding,
      });
    }
  };

  useEffect(() => {
    run(query);
  }, [query]);

  return (
    <div className={'main-container'}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
      >
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
              />
              Filter
            </div>
          </button>
        </div>

        {restroomList &&
          restroomList.map((restroom) => {
            return (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                key={restroom.id}
                layoutId={restroom.id}
              >
                <RestroomCard
                  id={restroom.id}
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
              </motion.div>
            );
          })}
        {error && <span>Something go wrong</span>}
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
          {buildingInfo.map((building) => {
            return (
              <MenuItem
                style={{
                  padding: '0px',
                }}
                key={building.buildingName}
              >
                <Radio
                  checked={selectedBuilding === building.buildingName}
                  onClick={(e) => handleBuildingRadioClick(e)}
                  name="building"
                  value={building.buildingName}
                  size="small"
                />
                <Button
                  onClick={() => {
                    handleMenuClick(building.buildingName);
                  }}
                  endIcon={<ArrowForwardIosIcon />}
                  color={'green'}
                  className={'menu-button'}
                  value={building.buildingName}
                  style={{ justifyContent: 'end' }}
                >
                  <span className={'text-wrap'}>
                    {building.buildingName}
                  </span>
                </Button>
              </MenuItem>
            );
          })}
        </Menu>

        {/*  MENU Floor*/}
        <Menu
          id="filter-menu"
          anchorEl={anchorMenuEl}
          open={openMenu}
          onClose={handleFilterClose}
        >
          {[...Array(buildingFloorCount)].map((_, i) => {
            const floor = i + 1;

            return (
              <MenuItem
                style={{
                  padding: '0px',
                  paddingLeft: '3px',
                  paddingRight: '10px',
                }}
                key={i}
              >
                <Radio
                  checked={selectedFloor === floor.toString()}
                  onClick={(e) => handleFloorRadioClick(e)}
                  name="floor"
                  value={floor}
                  size="small"
                />
                <span className={'green'}>{floor}</span>
              </MenuItem>
            );
          })}
        </Menu>
      </motion.div>
    </div>
  );
}
