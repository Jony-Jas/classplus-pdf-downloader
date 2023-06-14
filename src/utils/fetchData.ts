import axios from "axios";

const fetchData = async (url: string, token: string) => {
  const { data } = await axios.get(url, {
    headers: {
      "X-Access-Token": token,
    },
  });  
  const formatedData = data.data.courseContent.map(
    (item: { name: string; url: string }) => {
      return {
        name: item.name,
        url: item.url,
      };
    }
  );

  return formatedData;
};

export default fetchData;
