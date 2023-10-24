import './index.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CallMadeIcon from '@mui/icons-material/CallMade';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import RestroomCard from './components/RestroomCard.tsx';
import { getRestroomList } from '../../services/api.ts';
import { useRequest } from 'ahooks';
import { useRestroomList } from './restroom-list.store.ts';
import { Cascader } from 'antd';
// FIXME after backend is completed
import { regions, provinces, cities } from 'select-philippines-address';

type optionItem = {
  label: string;
  value: string;
  children?: optionItem[];
};

export default function Main() {
  // this control the params of getRestroomList
  const [query, setQuery] = useState<API.RestroomListQuery>({
    sort: 'NEW',
  });

  const [isfilterActive, setIsfilterActive] = useState(false);

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

  const handleFilterChange = (data: Record<any, any>[]) => {
    if (data.length === 0) setIsfilterActive(false);
    else setIsfilterActive(true);

    let regions: string[] = [];
    let provinces: string[] = [];
    let cities: string[] = [];
    let buildings: string[] = [];
    let floors: string[] = [];
    let genders: 'MALE' | 'FEMALE' | undefined;
    let availabilities: string[] = [];
    data.forEach((item) => {
      if (item[0] === 'Location' && item.length > 1) {
        if (!regions.includes(item[1])) regions.push(item[1]);
        if (item[2] && !provinces.includes(item[2]))
          provinces.push(item[2]);
        if (item[3] && !cities.includes(item[3])) cities.push(item[3]);
        if (item[4] && !buildings.includes(item[4]))
          buildings.push(item[4]);
        if (item[5] && !floors.includes(item[5])) floors.push(item[5]);
      }
      if (item[0] === 'Gender' && item.length > 1) {
        genders = item[1];
      }

      if (item[0] === 'Availability' && item.length > 1) {
        if (!availabilities.includes(item[1]))
          availabilities.push(item[1]);
      }
    });

    setQuery({
      ...query,
      region: regions.length ? JSON.stringify(regions) : undefined,
      province: provinces.length ? JSON.stringify(provinces) : undefined,
      city: cities.length ? JSON.stringify(cities) : undefined,
      building: buildings.length ? JSON.stringify(buildings) : undefined,
      floor: floors.length ? JSON.stringify(floors) : undefined,
      gender: genders ?? undefined,
      availability: availabilities.length
        ? JSON.stringify(availabilities)
        : undefined,
    });
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
              isfilterActive ? 'tab-button-active' : ''
            }`}
            id="basic-button"
            onClick={() => {
              setFilterOpen(!filterOpen);
            }}
            style={{ zIndex: 1000 }}
          >
            <div style={{ display: 'flex' }}>
              <FilterAltIcon
                fontSize={'inherit'}
                style={{ marginRight: 5 }}
              />
              Filter
            </div>
          </button>
          {
            <div
              id="cascader-container"
              style={{ display: `${filterOpen ? '' : 'none'}` }}
            >
              <Cascader
                multiple
                options={option}
                tagRender={() => {
                  return <></>;
                }}
                open={filterOpen}
                onChange={handleFilterChange}
                onBlur={() => {
                  setFilterOpen(false);
                }}
                autoFocus={true}
              />
            </div>
          }
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
