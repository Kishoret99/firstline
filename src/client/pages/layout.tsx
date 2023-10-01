import { classNames } from '../shared/utils';
import { Tab } from '@headlessui/react';
import { Grid, withStyles } from '@material-ui/core';
import { useEffect, useState } from 'react';

const BaseGrid = withStyles({
  root: {
    border: '1px solid darkgray',
  },
})(Grid);

const GridWrapper = withStyles({
  root: {
    height: '100vh',
    width: '100%',
  },
})(BaseGrid);

const LeftSideBar = withStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'lightgrey',
    overflowY: 'scroll',
    flexWrap: 'nowrap',
  },
})(BaseGrid);

const TopLeftNavCard = withStyles({
  root: {
    flex: '0 0 80px',
    background: 'lightgrey',
  },
})(BaseGrid);

const PatientDetails = withStyles({
  root: {
    flex: '0 0 300px',
    background: 'lightgrey',
  },
})(BaseGrid);

const TabsNav = withStyles({
  root: {
    flex: '1 0 auto',
    background: 'lightgrey',
  },
})(BaseGrid);

const RightPane = withStyles({
  root: {
    padding: '0 20px',
    display: 'flex',
    overflow: 'scroll',
  },
})(BaseGrid);

const TitleHeading = withStyles({
  root: {
    flex: '0 0 80px',
    background: 'lightgrey',
  },
})(BaseGrid);

const CardsList = withStyles({
  root: {
    background: 'lightgrey',
  },
})(BaseGrid);

const BaseCard = withStyles({
  root: {
    height: '400px',
    borderRadius: '20px',
  },
})(BaseGrid);

export default function Layout() {
  const [minimizedModals, setMinimizedModals] = useState([]);
  const openModal = (modalId) => {
    console.log(modalId);
    const modalExists = modals.find((modal) => modal.id === modalId);
    if (!modalExists) {
      setModals([...modals, { isOpen: true, id: modalId }]);
    }
  };

  const closeModal = (modalId) => {
    setModals(modals.filter((modal) => modal.id !== modalId));
  };
  const minimizeModal = (modalId) => {
    setModals(modals.filter((modal) => modal.id !== modalId));
    setMinimizedModals([
      ...minimizedModals,
      <div key={modalId} onClick={() => restoreModal(modalId)}>
        Minimized
      </div>,
    ]);
  };
  const restoreModal = (modalId) => {
    setMinimizedModals(
      minimizedModals.filter(
        (_, index) => index !== minimizedModals.length - 1,
      ),
    );
    openModal(modalId);
  };

  const [modals, setModals] = useState([]);

  useEffect(() => {
    console.log('modals', modals);
  }, [modals]);

  // Function to close a dialog
  const handleCloseDialog = (id) => {
    console.log('close dialog', id);
    setModals((prevDialogs) =>
      prevDialogs.filter((dialog) => dialog.id !== id),
    );
  };

  return (
    <>
      <GridWrapper container>
        <LeftSideBar item container xs={2} direction="column">
          <TopLeftNavCard item>
            TopLeftNavCard Lorem ipsum dolor sit amet consectetur adipisicing
          </TopLeftNavCard>
          <PatientDetails item>
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            PatientDetails Lorem ipsum dolor sit amet consectetur adipisicing
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi
            error vero debitis fuga earum dolorum quibusdam repudiandae
            aspernatur in Eius.
          </PatientDetails>
          <TabsNav>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
          </TabsNav>
        </LeftSideBar>
        <RightPane item xs={10} direction="column">
          <TitleHeading></TitleHeading>
          <CardsList container justifyContent="space-between">
            <BaseCard item xs={4} onClick={() => openModal(0)}></BaseCard>
            <BaseCard item xs={8}>
              <VitalSignsCard />
            </BaseCard>
            <BaseCard item xs={4} onClick={() => openModal(2)}></BaseCard>
            <BaseCard item xs={8} onClick={() => openModal(3)}></BaseCard>
            <BaseCard item xs={4} onClick={() => openModal(4)}></BaseCard>
            <BaseCard item xs={8}></BaseCard>
            <BaseCard item xs={4}></BaseCard>
          </CardsList>
        </RightPane>
      </GridWrapper>
      {modals.map((modal) => (
        <DraggableModal
          key={modal.id}
          open={modal.open}
          onClose={(e) => handleCloseDialog(modal.id)}
          zIndex={modal.zIndex}
          id={modal.id}
        />
      ))}
    </>
  );
}

const VitalSignsCard = () => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: 'Does drinking coffee make you smarter?',
        date: '5h ago',
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: '2h ago',
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: 'Is tech making coffee better or worse?',
        date: 'Jan 7',
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: 'The most innovative things happening in coffee',
        date: 'Mar 19',
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: 'Ask Me Anything: 10 answers to your questions about coffee',
        date: '2d ago',
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: '4d ago',
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2 flex-1 overflow-y-auto">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                'h-full',
              )}
            >
              <ul>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="relative rounded-md p-3 hover:bg-gray-100"
                  >
                    <h3 className="text-sm font-medium leading-5">
                      {post.title}
                    </h3>

                    <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>

                    <a
                      href="#"
                      className={classNames(
                        'absolute inset-0 rounded-md',
                        'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                      )}
                    />
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};
