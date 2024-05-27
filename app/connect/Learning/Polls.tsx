import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from "react-native";
import {supabase} from "../../../supabase";
import Poll from "./poll";

export type PollType = {
    relations: readonly any[];
    id: string
    created_at: Date,
    creator: {
        id: string
        picture: string
        realname: string
        username: string
    }
    due: Date
    correct: Number
    options: string[]
    question: string
    context: boolean
    creatorid: string
    contextType: 'png'
}

const Polls = () => {
    const [polls, setPolls] = useState<PollType[]>();

    useEffect(() => {
         async function fetch() {
            let { data, error } = await supabase.from("questions").select().order("created_at", { ascending: false }).limit(3)
             if(error) console.error(error.message);
             else { // @ts-ignore
                 setPolls(data);
             }
         }
         fetch()
    }, []);


    return (
        <View style={{ flex: 1}}>
            <FlatList data={polls} ListHeaderComponent={
                <Text style={{ fontFamily: "eudoxus", fontSize: 25, marginVertical: 10}}>Recent Activity</Text>
            } pagingEnabled={true}
                      keyExtractor={(item) => item.id.toString()}
                      ListEmptyComponent={() => <ActivityIndicator />} renderItem={({item}) => <Poll poll={item}/>} />
        </View>
    );
};

export default Polls;