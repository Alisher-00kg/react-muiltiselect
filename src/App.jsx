import { useEffect, useState } from "react";
import { Multiselect } from "./components/UI/MultiSelect";
import { axiosInstance } from "./api/axiosInstance";
import styled from "styled-components";

function App() {
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTimeZones = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance("/api/timezones");
        const formattedOptions = data?.map((zone) => ({
          label: zone,
          value: zone,
        }));
        setOptions(formattedOptions);
        console.log(formattedOptions);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    };
    getTimeZones();
  }, []);
  return (
    <StyledWrapper style={{ padding: "20px" }}>
      <h1>Test Multiselect</h1>
      {loading ? (
        <p>Loading . . .</p>
      ) : (
        <Multiselect
          options={options}
          selectedOptions={selected}
          onSelectionChange={setSelected}
          placeholder="Choos time zone ..."
        />
      )}
    </StyledWrapper>
  );
}
export default App;

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;
