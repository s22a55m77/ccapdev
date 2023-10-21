import './index.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallMadeIcon from '@mui/icons-material/CallMade';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { motion } from 'framer-motion';
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Popper,
  Radio,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import RestroomCard from './components/RestroomCard.tsx';
import { getRestroomList } from '../../services/api.ts';
import { useRequest } from 'ahooks';
import buildingInfo from './buildingInfo.ts';
import { useRestroomList } from './restroom-list.store.ts';
import { Cascader } from 'antd';
import { regions, provinces, cities } from 'select-philippines-address';
import { Simulate } from 'react-dom/test-utils';
import focus = Simulate.focus;

type optionItem = {
  label: string;
  value: string;
  children?: optionItem[];
};

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

  const restroomList = useRestroomList((state) => state.restroomList);
  const setRestroomList = useRestroomList(
    (state) => state.setRestroomList,
  );
  const setOriginalList = useRestroomList(
    (state) => state.setOriginalList,
  );
  const [regionData, setRegion] = useState([]);
  const [option, setOption] = useState<optionItem[]>();
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    regions().then((response: []) => {
      setRegion(response);
    });
  }, []);

  async function convertData(inputData: { regions: [] | never[] }) {
    const outputData = [];
    for (const region of inputData.regions) {
      const provinceList: optionItem[] = [];
      const regex = /\(([^)]+)\)/;
      const match = regex.exec(region.region_name);
      const regionNode = {
        label: match[1],
        value: match[1],
        children: provinceList,
      };

      await provinces(region.region_code).then(
        (response: { province_name: string; province_code: string }[]) => {
          response?.forEach(
            (item: { province_name: string; province_code: string }) => {
              const cityList: optionItem[] = [];
              const provinceNode = {
                label: item.province_name,
                value: item.province_name,
                children: cityList,
              };

              cities(item.province_code).then(
                (res: { city_name: string }[]) => {
                  res?.forEach((cityItem: { city_name: string }) => {
                    const cityNode = {
                      label: cityItem.city_name,
                      value: cityItem.city_name,
                    };
                    cityList.push(cityNode);
                  });
                },
              );

              provinceList.push(provinceNode);
            },
          );
        },
      );

      outputData.push(regionNode);
    }

    return outputData;
  }
  useEffect(() => {
    if (regionData?.length > 0) {
      const genderNode = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
      ];

      const availabilityNode = [
        { label: 'Hand Sanitizer', value: 'Hand' },
        { label: 'Vending Machine', value: 'Vending' },
        { label: 'Bag Hook', value: 'Bag' },
      ];
      // You can call convertData within your component or elsewhere, using regionData.
      convertData({ regions: regionData }).then((res) => {
        setOption([
          { label: 'Location', value: 'Location', children: res },
          { label: 'Gender', value: 'Gender', children: genderNode },
          {
            label: 'Availability',
            value: 'Availability',
            children: availabilityNode,
          },
        ]);
      });
    }
  }, [regionData]);

  const { run, error } = useRequest(getRestroomList, {
    defaultParams: [query],
    onSuccess: (data) => {
      setRestroomList(data);
      setOriginalList(data);
    },
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
    regions().then((region) => console.log(region));
  }, []);

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
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
          >
            <div style={{ display: 'flex' }}>
              <FilterAltIcon
                fontSize={'inherit'}
                style={{ marginRight: 5 }}
              />
              Filter
            </div>
          </button>
          {filterOpen && (
            <div id="cascader-container">
              <Cascader
                multiple
                options={option}
                tagRender={() => {
                  return <></>;
                }}
                open={filterOpen}
                onBlur={() => {
                  setFilterOpen(false);
                }}
                autoFocus={true}
              />
            </div>
          )}
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
      </motion.div>
    </div>
  );
}
