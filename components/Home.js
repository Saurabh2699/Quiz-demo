import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Animated } from 'react-native'
import mcqs from '../data'
import moment from 'moment'

export class Home extends Component {

    state = {
        data: mcqs,
        activeColor: '#FFFFFF',
        finishTime: moment.duration().add({ minutes: 10, seconds: 0 }),
        mins: 0,
        secs: 0,
        progressStatus: 0
    }

    anim = new Animated.Value(0)

    componentDidMount() {
        this.onAnimate()
        this.updateTimer()
    }

    updateTimer = () => {

        const x = setInterval(() => {
            let { finishTime } = this.state

            if (finishTime <= 0) {
                clearInterval(x)
            } else {
                finishTime = finishTime.subtract(1, "s")
                const mins = finishTime.minutes()
                const secs = finishTime.seconds()

                this.setState({
                    mins,
                    secs,
                    finishTime
                })
            }
        }, 1000)
    }

    onAnimate = () => {
        this.anim.addListener(({ value }) => {
            this.setState({ progressStatus: parseInt(value, 10) });
        });
        Animated.timing(this.anim, {
            toValue: 20,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}> MOCK TEST </Text>
                </View>

                <View style={styles.subHeader}>

                    <View>
                        <Text style={[styles.questionDescription, { marginLeft: 50 }]}>1/20 Questions</Text>
                        <View style={{ width: 180, marginHorizontal: 10, backgroundColor: 'white' }}>
                            <Animated.View style={[styles.progressBar, { width: this.state.progressStatus + '%' }]} />
                        </View>
                    </View>

                    <View style={styles.timer}>
                        <Text style={[styles.questionDescription, { fontSize: 25 }]}>{`${this.state.mins} : ${this.state.secs}`}</Text>
                    </View>

                </View>

                <View style={styles.questionNumbers}>
                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.data}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={styles.number}>
                                    <Text style={{ color: '#292059', fontWeight: 'bold', fontSize: 18 }}>
                                        {item.id}
                                    </Text>
                                </View>
                            </TouchableOpacity>

                        )}
                    />
                </View>

                <View style={styles.question}>
                    <Text style={styles.questionCount}>Question 1</Text>
                    <Text style={styles.questionDescription}>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur odio, modi vel corrupti eveniet tempore deleniti id nobis reprehenderit quasi,
                        vitae ratione numquam ipsum nihil amet voluptates, nemo hic velit?
                    </Text>
                </View>

                <TouchableOpacity style={styles.optionContainer} onPress={() => this.setState({ activeColor: '#72EF31' })}>
                    <View style={[styles.option, { backgroundColor: this.state.activeColor }]}>
                        <Text style={{ fontSize: 18, color: '#292059', fontWeight: 'bold', marginHorizontal: 10, }}>
                            A.
                        </Text>
                        <Text style={{ fontSize: 18 }}>Lorem ipsum dolor sit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                    <View style={styles.option}>
                        <Text style={{ fontSize: 18, color: '#292059', fontWeight: 'bold', marginHorizontal: 10, }}>
                            B.
                        </Text>
                        <Text style={{ fontSize: 18 }}>Lorem ipsum dolor sit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer}>
                    <View style={styles.option}>
                        <Text style={{ fontSize: 18, color: '#292059', fontWeight: 'bold', marginHorizontal: 10, }}>
                            C.
                        </Text>
                        <Text style={{ fontSize: 18 }}>Lorem ipsum dolor sit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionContainer} >
                    <View style={styles.option}>
                        <Text style={{ fontSize: 18, color: '#292059', fontWeight: 'bold', marginHorizontal: 10, }}>
                            D.
                        </Text>
                        <Text style={{ fontSize: 18 }}>Lorem ipsum dolor sit</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>SKIP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}> REMARK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>NEXT</Text>
                    </TouchableOpacity>
                </View>

            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        backgroundColor: '#292059',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 24
    },
    questionNumbers: {
        marginTop: 20
    },
    number: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: '#EFF3FF',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 8,
    },
    question: {
        marginVertical: 15
    },
    questionCount: {
        fontSize: 30,
        color: '#292059',
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    questionDescription: {
        marginHorizontal: 10,
        letterSpacing: 0.5,
        marginTop: 10,
        fontSize: 15,
        color: '#292059',
        fontWeight: 'bold'
    },
    option: {
        flexDirection: 'row'
    },
    optionContainer: {
        marginTop: 10,
        paddingTop: 10,
        borderWidth: 2,
        height: 45,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: '#EFF3FF',
    },
    buttonContainer: {
        marginTop: 30,
        marginHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#292059',
        width: 100,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1
    },
    subHeader: {
        flexDirection: 'row',
        height: 60,
        backgroundColor: '#EFF3FF',
    },
    progressBar: {
        height: 15,
        backgroundColor: '#72EF31',
    },
    timer: {
        padding: 8,
        marginLeft: 50
    }

})

export default Home
