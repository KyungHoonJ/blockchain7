import styled from "styled-components";

const ListComponent = ({ list }) => {
  return (
    <ListBox>
      <colgroup>
        <col width={"10%"} />
        <col width={"50%"} />
        <col width={"20%"} />
        <col width={"20%"} />
      </colgroup>
      <thead>
        <tr>
          <th>index</th>
          <th>Title</th>
          {/* <th>Text</th> */}
          <th>UserName</th>
          <th>createdAt</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => (
          <tr key={`tr-${index}`}>
            <td key={`id-${index}`}>{item.id}</td>
            <td key={`title-${index}`}>{item.title}</td>
            <td key={`userName-${index}`}>{item.userName}</td>
            <td key={`createdAt-${index}`}>{item.createdAt}</td>
          </tr>
        ))}
      </tbody>
    </ListBox>
  );
};

export default ListComponent;

const ListBox = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    border-bottom: 1px solid black;
  }

  td {
    border-bottom: 1px dashed black;
    text-align: center;
  }
`;
