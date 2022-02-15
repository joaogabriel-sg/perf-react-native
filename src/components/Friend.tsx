import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Props {
  data: {
    id: number;
    name: string;
    likes: number;
    online: string;
  };
  follow: () => void;
}

function FriendComponent({ data, follow }: Props) {
  return (
    <View style={{ marginTop: 10 }}>
      <Text>
        {data.name} - Likes: {data.likes}
      </Text>

      <TouchableOpacity onPress={follow}>
        <Text>Deixar de seguir</Text>
      </TouchableOpacity>

      <Text>Online em {data.online}</Text>
    </View>
  );
}

export const Friend = memo(FriendComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.data, nextProps.data);
});
