import React from "react";
import styled from "styled-components";
import { MovieCardProps } from "@/interfaces";
import { useRouter } from "next/navigation";

const Card = styled.div`
  flex: 0 0 150px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  box-shadow: 0 5px 30px rgba(29, 31, 31, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(113, 123, 123, 0.2);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Info = styled.div`
  padding: 1rem 1.2rem;
`;

const Title = styled.h3`
  font-size: 0.8rem;
  font-weight: 400;
  color: #151415ff;
  margin-bottom: 0.5rem;
  text-overflow: ellipsis;
`;

const Rating = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ff2600ff;
  background: rgba(0, 255, 255, 0.1);
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
`;

const MovieCard: React.FC<MovieCardProps> = ({ id, title, poster, rating }) => {
  const router = useRouter();
  const handleClick = ()=>{
    router.push(`/movie/${id}`);
  }
  return (
    <Card key={id} onClick={handleClick}>
      <Poster src={poster} alt={title} />
      <Info>
        <Title>{title}</Title>
        <Rating>{rating}</Rating>
      </Info>
    </Card>
  );
};

export default MovieCard;
