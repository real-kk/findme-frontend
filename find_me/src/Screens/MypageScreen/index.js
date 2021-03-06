import React from 'react';
import { Platform, StatusBar, Image, StyleSheet,  View, Text, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { requestLogout } from '../../Store/actions/AuthAction'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from '../../axiosConfig'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const mapStateToProps = (state) => ({
    token: state
  })

const mapDispatchToProps = (dispatch) => ({
    requestLogout: () => dispatch(requestLogout())
  })


class MypageScreen extends React.Component {
    constructor(){
        super();
        this.state={
            userid: '',
            id: '',
            name: '',
            email: '',
            link_man: '',
            user_type: '',
            introduce: '',
            image: '',
            counselor_name:'',
            client_email: '',
            client_name: '',
            content: '',
            time_table: '',
            student_number: '',
            phone_number: '',
            major: '',
            counselor_email: '',
            flag: false,
            datas: [
                {key:'0', data:'회원 정보 수정', icon:'account-circle-outline'},
                {key:'1', data:'비밀 번호 변경', icon:'lock-outline'},
                {key:'2', data:'상담 신청서 수정', icon:'grease-pencil'},
                {key:'3', data:'로그아웃', icon:'logout-variant'},
            ],
        }
    }
    getUser = () => {
      axios.get('/users/selfinfos/',
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
        this.setState({
          userid: res.data.id,
          name: res.data.username === null ? 'None' : res.data.username,
          email: res.data.email,
          user_type: res.data.user_type,
          image: res.data.image === "" ? 'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + 'users/no_img.png' 
          :'https://findme-app.s3.ap-northeast-2.amazonaws.com/' + res.data.image,
          introduce: res.data.introduce === '' ? 'None!' : res.data.introduce,
        })
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        else if (error.request) {
          console.log(error.request);
        }
        else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });

      axios.get('/counsels/date/',
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{
        this.setState({
          link_man: res.data[0].counselor_username === undefined ? '없음' : res.data[0].counselor_username
        })
      })
      .catch(err=>console.log(err))

      axios.get('/counsels/',
      { headers: {
        'Authorization' : `Token ${this.props.token.auth.token}`
      }})
      .then((res)=>{

        if(res.data == ''){
          this.setState({
            flag: false,
          })
        }
        else{
          this.setState({
            counselor_name: res.data[0].counselor_username,
            client_email: res.data[0].client_email,
            name: res.data[0].client_username,
            content: res.data[0].content,
            phone_number: res.data[0].phone_number,
            student_number: res.data[0].student_number,
            time_table: res.data[0].time_table,
            major: res.data[0].major,
            id: res.data[0].id,
            counselor_email: res.data[0].counselor_email,
            flag: true,
          })
        }
      })
      .catch(err=>console.log(err))
    }

    _onclickLogout = () => {
        this.props.requestLogout()
        this.props.navigation.navigate('Login')
        alert("로그아웃 되었다.")
    }

    componentDidMount(){
      this.getUser()
    }

    componenDidUpdate(){
      this.getUser()
    }

    render() {
      return (
          <View style={styles.container}>
                <Text style={styles.logo}>FIND ME</Text>
                <View style={styles.profile}>
                    <View style = {styles.profile_image}>
                    <Image 
                    style={styles.user}
                    source={{uri: this.state.image ? this.state.image : null}}/>
                    <View style={{flexDirection: 'row' }}>
                      <Text style={{ marginLeft: wp('4%'), fontSize:18, paddingTop:hp('2%'), fontFamily:'netmarbleB'}}>{this.state.name}</Text>
                      <TouchableOpacity
                        onPress={()=>{
                          this.getUser()
                        }}
                      >
                        <Icon name='reload' size={22} style={{ color: 'black', paddingTop:hp('2%'), marginLeft: wp('1%')}}></Icon>
                      </TouchableOpacity>
                    </View>
                    </View>
                    <View style = {styles.profile_text}>
                        <Text style={{fontSize:16, marginBottom:hp('0.5%'), fontFamily:'netmarbleM', color:'gray'}}>이메일</Text>
                        <Text style={{fontSize:16, marginBottom:hp('1%'), fontFamily:'netmarbleL', color:'white'}}>{this.state.email}</Text>
                        <Text style={{fontSize:16, marginBottom:hp('0.5%'), fontFamily:'netmarbleM', color:'gray'}}>연결된 상담사</Text>
                        <Text style={{fontSize:16, marginBottom:hp('1%'), fontFamily:'netmarbleL', color:'white'}}>{this.state.link_man}</Text>
                        <Text style={{fontSize:16, marginBottom:hp('0.5%'), fontFamily:'netmarbleM', color:'gray'}}>자기 소개</Text>
                        <Text style={{fontSize:16, fontFamily:'netmarbleL', color:'white'}}>{this.state.introduce}</Text>
                    </View>
                </View>
                
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={this.state.datas}
                    renderItem={({item})=>{
                        return(
                            <TouchableOpacity
                                onPress={()=> {
                                    if(item.key === '0'){
                                        this.props.navigation.push('userModification', {
                                          userid: this.state.userid,
                                          email: this.state.email,
                                          name: this.state.name,
                                          user_type: this.state.user_type,
                                          image: this.state.image,
                                          introduce: this.state.introduce,
                                          link_man: this.state.link_man,
                                        })
                                    }
                                    else if(item.key === '1'){
                                      this.props.navigation.push('passwordModification')
                                    }
                                    else if(item.key === '2'){
                                      
                                      this.getUser()
                                      if(this.state.flag == false){
                                        alert("상담 신청서가 없습니다!")
                                      }
                                      else{
                                        this.props.navigation.push('applicationFormModification', {
                                          link_man: this.state.counselor_name,
                                          client_email: this.state.client_email,
                                          client_name: this.state.client_name,
                                          content: this.state.content,
                                          phone_number: this.state.phone_number,
                                          student_number: this.state.student_number,
                                          time_table: this.state.time_table,
                                          major: this.state.major,
                                          id: this.state.id,
                                          counselor_email: this.state.counselor_email,
                                        })
                                      }
                                    }
                                    else if(item.key === '3'){
                                        this._onclickLogout();
                                    }
                                }}
                            >
                                <View style={styles.list}>
                                    <Icon name= {item.icon} size={30} color='rgba(114,174,148,0.9)'/>   
                                    <Text style={styles.text}>{item.data}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />

            </View>
      )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MypageScreen)

const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: Platform.OS === 'android' ? 0 : StatusBar.currentHeight,
  },
  logo:{
    paddingTop: hp('4%'),
    fontSize:30, 
    color:'#fff', 
    textAlign:'center',
    fontFamily:'netmarbleB',
    backgroundColor:'rgba(114,174,148,0.9)',
    width:wp('100%'),
  },
  profile : {
    width:wp('100%'),
    height:hp('32%'),
    backgroundColor:'rgba(114,174,148,0.9)',
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:wp('5%'),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom:hp('2%'),
  },
  profile_image:{
    marginLeft:wp('1%'),
  },
  user:{
    width: wp('30%'),
    height: hp('15%'),
    borderRadius: 200,
    borderWidth:2,
    borderColor:'white'

  },
  profile_text:{
    marginTop:hp('1%'),
    paddingLeft:wp('10%'),
    fontSize:20,
  },
  
  list: {
    width: wp('100%'),
    height: hp('10%'),
    flexDirection:'row',
    alignItems:'center',
    paddingLeft:wp('9%'),
  },
  
  text: {
      marginLeft: 5,
      fontSize: 20,
      paddingLeft:wp('5%'),
      color:'gray'
  },

});


