import LayoutProfile from "../../component/LayoutProfile";
import { CardLibrary } from "../../component/Card";
import { Tab, Content } from "../../component/Tabs";
import { useState } from "react";
// import { ModalLogout } from "../../component/Modals";

const Perpustakaan = () => {
  const [activeTab, setActiveTab] = useState("Semua");
  const handleTabsClick = (tab: any) => {
    setActiveTab(tab);
  };
  return (
    <LayoutProfile id="perpustakaan">
      {/* <ModalLogout /> */}
      <div className="flex w-[97%] h-auto flex-col justify-center items-center px-5 py-3 border-2 rounded-2xl shadow-md">
        <div className="flex flex-row w-5/6 text-start">
          <Tab label="Semua" activeTab={activeTab} onClick={handleTabsClick} />
          <Tab label="Paud" activeTab={activeTab} onClick={handleTabsClick} />
          <Tab
            label="Taman Kanak Kanak"
            activeTab={activeTab}
            onClick={handleTabsClick}
          />
          <Tab
            label="Sekolah Dasar"
            activeTab={activeTab}
            onClick={handleTabsClick}
          />
        </div>
        <div className="w-full flex flex-col">
          {activeTab === "Semua" && (
            <Content>
              <CardLibrary />
              <CardLibrary />
              <CardLibrary />
              <CardLibrary />
              <CardLibrary />
            </Content>
          )}
          {activeTab === "Paud" && (
            <Content>
              <CardLibrary />
              <CardLibrary />
              <CardLibrary />
              <CardLibrary />
            </Content>
          )}
          {activeTab === "Taman Kanak Kanak" && (
            <Content>
              <CardLibrary />
              <CardLibrary />
              <CardLibrary />
            </Content>
          )}
          {activeTab === "Sekolah Dasar" && (
            <Content>
              <CardLibrary />
              <CardLibrary />
            </Content>
          )}
        </div>
      </div>
    </LayoutProfile>
  );
};
export default Perpustakaan;
