<template><!--用户资料修改-->
    <div class="userInfoMod">
        <div class="infoBox">        
            <div class="box">
                <div class="lbox">
                    <div class="ybq">
                        <span>{{$t('company.Companyinformations')}}</span><br>
                        <span v-if="company.comStatus == null"> </span>
                        <span v-if="company.comStatus == 1">{{$t('Saved')}}</span>
                        <span v-if="company.comStatus == 2">{{$t('Submission')}}</span><!--已提交-->
                        <span v-if="company.comStatus == 3">{{$t('Approved')}}</span><!--审核通过-->
                        <span v-if="company.comStatus == 4" style="color:red;">{{$t('Dismissal')}}</span><!--已驳回-->
                        <div class="left">
                            <el-button type="primary" style="margin-top: 25px;" @click="saveCompany(STATUS.SAVE, 0)" v-if="edit">{{$t('Save')}}</el-button>
                        </div>
                    </div>
                </div>                
                <div class="rbox" style="padding-bottom: 0">
                    <div class="info-box">
                        <div class="rbbq1">
                            <div class="rbbq" :class="{'errorClass': errors.has('公司名称') }">
                                <div class="tit"><i class="el-icon-caret-right"></i>{{$t('company.companyname')}}</div>
                                <div class="cen">
                                    <input class="text" v-validate data-vv-rules="required|max:60" name="comName" type="text" v-model="company.comName" :placeholder="$t('pleaseenter')">
                                </div>
                            </div>
                            <div class="validateStyle">
                                <span v-show="errors.has('comName')" class="help is-danger">{{ errors.first('comName') }}</span>
                            </div>
                        </div>
                        <div class="rbbq2">
                            <div class="rbbq" style="margin-right:0">
                                <div class="tit"><i class="el-icon-caret-right"></i>{{$t('company.Companyaddress')}}</div>
                                <div class="cen">
                                    <input class="text" v-validate data-vv-rules="required|max:300" name="comAddress"
                                        type="text" v-model="company.comAddress" :placeholder="$t('pleaseenter')">
                                </div>
                            </div>
                            <div class="validateStyle">
                                <span v-show="errors.has('comAddress')" class="help is-danger">{{ errors.first('comAddress') }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="info-box2">
                        <div class="rbbq3">
                            <div class="rbbq">
                                <div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('company.Companywebsite')}}</div>
                                <div class="cen">
                                    <input class="text" type="text" v-validate data-vv-rules="url|max:100" data-vv-as="公司网址"  name="comUrl" v-model="company.comUrl" :placeholder="$t('pleaseenter')">                       
                                </div>
                            </div>
                            <div class="validateStyle">
                            <span v-show="errors.has('comUrl')" class="help is-danger">{{ errors.first('comUrl') }}</span>
                            </div>
                        </div>
                        <div class="rbbq4" style="flex:2">
                            <div class="rbbq" style="margin-right:10px">
                                <div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('company.Postcode')}}</div>
                                <div class="cen">
                                    <input class="text" type="text" v-validate data-vv-rules="postcode" data-vv-as="邮编"  name="comPostcode" v-model="company.comPostcode" :placeholder="$t('pleaseenter')">               
                                </div>
                            </div>
                            <div class="validateStyle">
                            <span v-show="errors.has('comPostcode')" class="help is-danger">{{ errors.first('comPostcode') }}</span>
                            </div>
                        </div>
                        <div class="rbbq5">
                            <div class="rbbq">
                                <div class="tit gray" ><i class="el-icon-caret-right gray"></i>{{$t('company.region')}}</div>
                                <div class="cen">
                                    <el-autocomplete
                                        :debounce="0" 
                                        v-model="company.comRegion"
                                        :fetch-suggestions="querySearch"
                                        :placeholder="$t('pleaseenter')"
                                        @select="handleSelect"
                                    ></el-autocomplete>
                                </div>
                            </div>
                            <div class="validateStyle"></div>
                        </div>
                        <div class="rbbq6" style="flex:3">
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>{{$t('company.Companycategory')}}</div>
                                <div class="sfsq">
                                <el-radio-group v-model="company.comBase" class="bjJd">
                                        <el-radio-button label="基地">{{$t('company.base')}}</el-radio-button>
                                        <el-radio-button label="非基地">{{$t('company.Thebase')}}</el-radio-button>	
                                        <el-radio-button label="非基地优质客户">{{$t('company.Nonbasequalitycustomers')}}</el-radio-button>	
                                    </el-radio-group>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info-box3">
                        <div class="rbbq7" style="position: relative;">
                            <div class="rbbq">
                                <div class="tit"><i class="el-icon-caret-right"></i>{{$t('company.ValidityofagreementFrom')}}</div>
                                <div class="cen" >
                                    <label class="input-time"  v-if="showComContractB">
                                        <el-date-picker type="date"  v-model="company.comContractB" :placeholder="$t('Pleaseselectdate')"  :clearable="false"
                                            value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                        <i class="el-icon-date"></i>
                                    </label>
                                </div>
                            </div>
                            <i class="el-icon-caret-right grays"></i>
                        </div>
                        
                        <div class="rbbq8">
                            <div class="rbbq"> 
                                <div class="tit"><i class="el-icon-caret-right"></i>{{$t('company.To')}}</div>      
                                <div class="cen">
                                    <label class="input-time"  v-if="showComContractB">
                                        <el-date-picker type="date" name="协议截止日期" v-validate="'required|afterDate:'+company.comContractB" value-format="yyyy-MM-dd HH:mm:ss" v-model="company.comContractE" :placeholder="$t('Pleaseselectdate')"  :clearable="false"></el-date-picker>
                                        <i class="el-icon-date"></i>
                                    </label>
                                    
                                </div>
                            </div>
                            <div class="validateStyle"><span v-show="errors.has('协议截止日期')" class="help is-danger">{{ errors.first('协议截止日期') }}</span></div>
                        </div> 
                        <div class="rbbq9">
                            <div class="rbbq">
                                <div class="tit gray"><i class="el-icon-caret-right gray"></i>{{$t('company.business')}}</div>
                                <div class="cen">
                                    <singleFileUpload v-if="showComContractB"
                                        :fileType="6" 
                                        :fileName="company.doc == null ? '':company.doc.docName" 
                                        :serverFileName="company.doc == null ? '':company.doc.docAddress" 
                                        @success="saveFileInfo">
                                    </singleFileUpload>                                       
                                </div>
                            </div>
                        </div>
                        <div class="validateStyle">
                            <span v-show="errors.has('companyDoc')" class="help is-danger">{{ errors.first('companyDoc') }}</span>
                        </div>
                    </div>
                    <div class="info-box4">
                        <div class="rbbq">
                            <div class="tit"><i class="el-icon-caret-right"></i>{{$t('company.Companyprofile')}}</div>
                            <div class="cen">
                                <textarea class="beizhu inputText" v-validate data-vv-rules="required|max:1000" data-vv-as="公司简介" name="comDesc" v-model="company.comDesc" :placeholder="$t('pleaseenter')"></textarea>                    
                            </div>
                        </div>
                        <div class="validateStyle">
                            <span v-show="errors.has('comDesc')" class="help is-danger">{{ errors.first('comDesc') }}</span>
                        </div>
                    </div>
                    <div class="info-box4" v-if="company.comCheckReason != null && company.comCheckReason != ''">
                        <div class="rbbq" style="margin-bottom:20px">
                            <div class="tit"><i class="el-icon-caret-right"></i>{{$t('Dismissal')}}</div>
                            <div class="cen">
                                <textarea class="beizhu inputText" v-model="company.comCheckReason" disabled></textarea>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <div class="box">
                <div class="lbox">
                    <div class="ybq">
                        <span>{{$t('company.companycontacts')}}</span>
                        <div class="left" v-if="!edit">
                            <el-button type="primary" style="margin-top: 30px;" @click="addContact()">{{$t('Add')}}</el-button>
                        </div>
                    </div>
                </div>                
                <div class="rbox modGray dateStyleCenter"  v-if="edit">
                    <div class="table-box">
                        <table class="table table-border table-bg">
                            <thead>
                                <tr>
                                    <th class="bt width70">{{$t('company.Contacts')}}</th>
                                    <th class="bt">{{$t('company.Mobilephone')}}</th>
                                    <th class="bt">{{$t('company.Telephone')}}</th>
                                    <th class="bt">Email</th>
                                    <th>{{$t('company.Fax')}}</th>
                                    <th class="bt" style="width:120px">{{$t('company.Identitycertificate')}}</th>
                                </tr>
                            </thead>
                            <tr  v-for="(contact,index) in contactList">
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conName" disabled>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conCell" disabled>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conTel" disabled>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conEmail" disabled>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conFax" disabled>
                                </td>
                                <td style="width:145px">
                                    <singleFileUpload
                                        :fileType="7" 
                                        :disabled="true" 
                                        :index="index"
                                        :fileName="contact.doc == null ? '':contact.doc.docName" 
                                        :serverFileName="contact.doc == null ? '':contact.doc.docAddress" 
                                        @success="saveFileInfo">
                                    </singleFileUpload>
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>
                <div class="rbox dateStyleCenter" v-else>
                    <div class="table-box">
                        <table class="table table-border table-bg">
                            <thead>
                                <tr>
                                    <th class="bt width70">{{$t('company.Contacts')}}</th>
                                    <th class="bt">{{$t('company.Mobilephone')}}</th>
                                    <th class="bt">{{$t('company.Telephone')}}</th>
                                    <th class="bt">Email</th>
                                    <th>{{$t('company.Fax')}}</th>
                                    <th class="bt" style="width:120px">{{$t('company.Identitycertificate')}}</th>
                                    <th  class="width45">{{$t('operation')}}</th>
                                </tr>
                            </thead>
                            <tr  v-for="(contact,index) in contactList">
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conName" :placeholder="$t('pleaseenter')"
                                        v-validate data-vv-rules="required" data-vv-as="联系人名称" :name="'conName'+index">
                                    <span v-show="errors.has('conName'+index)" class="help is-danger">{{ errors.first('conName'+index) }}</span>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conCell" :placeholder="$t('pleaseenter')"
                                        v-validate data-vv-rules="required|phone" data-vv-as="手机号" :name="'conCell'+index">
                                    <span v-show="errors.has('conCell'+index)" class="help is-danger">{{ errors.first('conCell'+index) }}</span>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conTel" placeholder="xxx-xxxxxxx-xxx"
                                        v-validate data-vv-rules="required|tel" data-vv-as="电话" :name="'conTel'+index">
                                    <span v-show="errors.has('conTel'+index)" class="help is-danger">{{ errors.first('conTel'+index) }}</span>
                                    </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="contact.conEmail" :placeholder="$t('pleaseenter')"
                                        v-validate data-vv-rules="required|email" data-vv-as="邮箱" :name="'conEmail'+index">
                                    <span v-show="errors.has('conEmail'+index)" class="help is-danger">{{ errors.first('conEmail'+index) }}</span>
                                </td>
                                <td>
                                    <!-- <input type="text" class="input-text radius" v-model="contact.conFax" placeholder="请输入"> -->
                                    <input type="text" class="input-text radius" v-model="contact.conFax" :placeholder="$t('pleaseenter')"
                                        v-validate data-vv-rules="tel" data-vv-as="传真" :name="'conFax'+index">
                                    <span v-show="errors.has('conFax'+index)" class="help is-danger">{{ errors.first('conFax'+index) }}</span>

                                </td>
                                <td>
                                    <singleFileUpload v-if="showFileNamesd"
                                        :fileType="7" 
                                        :index="index"
                                        :fileName="contact.doc == null ? '':contact.doc.docName" 
                                        :serverFileName="contact.doc == null ? '':contact.doc.docAddress" 
                                        @success="saveFileInfo">
                                    </singleFileUpload>
                                    <input type="hidden" v-if="showFileNamesd" v-validate data-vv-rules="required" data-vv-as="身份证明" :name="'contactDoc'+index" :value="contact.doc" >
                                    <span v-show="errors.has('contactDoc'+index)" class="help is-danger">{{ errors.first('contactDoc'+index) }}</span>
                                </td>
                                <td>
                                    <button v-if="contactListFalse" class="btn btn-green radius" @click="clearContact(index)">{{$t('Delete')}}</button>
                                    <button v-else style="background:#eee;border:1px solid #eee !important" class="btn btn-green radius">{{$t('Delete')}}</button>
                                    
                                </td>
                            </tr>
                            
                        </table>
                    </div>
                </div>                                    
            </div>
            <div class="box">
                <div class="lbox">
                    <div class="ybq">
                        <span>{{$t('company.Licenseinformation')}}</span>
                    </div>
                </div>
                <div class="rbox modGray dateStyleCenter" v-if="edit">
                    <div class="table-box">
                        <table class="table table-border table-bg">
                            <thead>
                                <tr>
                                    <th class="width70">{{$t('company.Licensename')}}</th>
                                    <th>{{$t('company.No')}}</th>
                                    <th class="width70">{{$t('company.validityFrom')}}</th>
                                    <th class="width70">{{$t('company.validityTo')}}</th>
                                    <th>{{$t('company.Issuingauthority')}}</th>
                                    <th class="width70">{{$t('company.Issuedate')}}</th>
                                    <th style="width:120px">{{$t('Attachment')}}</th>
                                </tr>
                            </thead>
                            <tr v-for="(certification,index) in certificationList">
                                <td>{{certification.certType}}</td>
                                <td><input type="text" class="input-text radius" v-model="certification.certCode" disabled>
                                </td>
                                <td>
                                    <div class="timeBorder">
                                    <el-date-picker v-model="certification.certValidB" type="date" disabled
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <div class="timeBorder">
                                    <el-date-picker v-model="certification.certValidE" type="date" disabled
                                        value-format="yyyy-MM-dd HH:mm:ss"
                                    ></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                <input type="text" class="input-text radius" v-model="certification.certAuthority" disabled>
                                </td>
                                <td>
                                    <div class="timeBorder">
                                    <el-date-picker v-model="certification.certDate" type="date" value-format="yyyy-MM-dd HH:mm:ss" disabled
                                    ></el-date-picker>
                                    </div>
                                </td>
                                <td style="width:145px">
                                    <singleFileUpload
                                        :fileType="8" 
                                        :disabled="true" 
                                        :index="index"
                                        :fileName="certification.doc == null ? '':certification.doc.docName" 
                                        :serverFileName="certification.doc == null ? '':certification.doc.docAddress" 
                                        @success="saveFileInfo">
                                    </singleFileUpload>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="rbox dateStyleCenter" v-else><!--kexiugai-->
                    <div class="table-box">
                        <table class="table table-border table-bg">
                            <thead>
                                <tr>
                                    <th class="width70">{{$t('company.Licensename')}}</th>
                                    <th>{{$t('company.No')}}</th>
                                    <th class="width70">{{$t('company.validityFrom')}}</th>
                                    <th class="width70">{{$t('company.validityTo')}}</th>
                                    <th>{{$t('company.Issuingauthority')}}</th>
                                    <th class="width70">{{$t('company.Issuedate')}}</th>
                                    <th style="width:120px">{{$t('Attachment')}}</th>
                                </tr>
                            </thead>
                            <tr v-for="(certification,index) in certificationList">
                                <td>{{certification.certType}}</td>
                                <td>
                                    <input type="text" class="input-text radius" :placeholder="$t('pleaseenter')" v-model="certification.certCode">
                                </td>
                                <td>
                                    <div class="timeBorder">
                                        <el-date-picker v-model="certification.certValidB" type="date" :placeholder="$t('Pleaseselectdate')" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <div class="timeBorder">
                                        <el-date-picker v-model="certification.certValidE" type="date" :placeholder="$t('Pleaseselectdate')" :clearable="false" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" :placeholder="$t('pleaseenter')" v-model="certification.certAuthority">
                                </td>
                                <td>
                                    <div class="timeBorder">
                                        <el-date-picker v-model="certification.certDate" type="date" :placeholder="$t('Pleaseselectdate')" :clearable="false"  value-format="yyyy-MM-dd HH:mm:ss"                                       
                                        ></el-date-picker>
                                    </div>
                                </td>
                                <td style="width:145px">
                                    <singleFileUpload v-if="zjzlFalse"
                                        :fileType="8" 
                                        :index="index"
                                        :fileName="certification.doc == null ? '':certification.doc.docName" 
                                        :serverFileName="certification.doc == null ? '':certification.doc.docAddress" 
                                        @success="saveFileInfo">
                                    </singleFileUpload>
                                    <input type="hidden" :value="certification.doc" >
                                </td>
                                <!-- <td>
                                    <input type="button" class="btn btn-green radius" @click="saveCertification(index)" value="保存">
                                </td> -->
                            </tr>
                            <!-- <tr><input type="button" class="btn btn-green radius" @click="saveCertification(index)" value="保存"></tr> -->
                        </table>
                    </div>
                </div>
            </div>

            <div class="box">
                <div class="lbox">
                    <div class="ybq">
                        <span>{{$t('company.Qualificationinformation')}}</span>
                    </div>
                </div>
                <div class="rbox modGray dateStyleCenter" v-if="edit">
                    <div class="table-box">
                        <table class="table table-border table-bg">
                            <thead>
                                <tr>
                                    <th class="width70">{{$t('company.Qualificationname')}}资质名称</th>
                                    <th style="width:50px">{{$t('company.isqualified')}}是否具备</th>
                                    <th class="bt">{{$t('company.No')}}号码</th>
                                    <th class="bt">{{$t('company.validityFrom')}}有效期起</th>
                                    <th class="bt">{{$t('company.validityTo')}}有效期止</th>
                                    <th class="bt width45">{{$t('Attachment')}}附件</th>
                                </tr>
                            </thead>
                            <tr v-for="(qualification,index) in qualificationList">
                                <td v-text="qualification.qualType"></td>
                                <td>
                                    <el-radio-group v-model="qualification.qualIsvalid" disabled>
                                        <el-radio label="是">{{$t('company.yes')}}</el-radio>
                                        <el-radio label="否">{{$t('company.no')}}</el-radio>	
                                    </el-radio-group>
                                </td>
                                <td>
                                    <input type="text" class="input-text radius" v-model="qualification.qualCode" disabled>
                                </td>
                                <td>
                                    <div class="timeBorder">
                                        <el-date-picker v-model="qualification.qualValidB" type="date" disabled value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <div class="timeBorder">
                                        <el-date-picker v-model="qualification.qualValidE" type="date" disabled value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <singleFileUpload
                                        :fileType="9" 
                                        :disabled="true" 
                                        :index="index"
                                        :fileName="qualification.doc == null ? '':qualification.doc.docName" 
                                        :serverFileName="qualification.doc == null ? '':qualification.doc.docAddress" 
                                        @success="saveFileInfo">
                                    </singleFileUpload>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="rbox dateStyleCenter" v-else><!--kexiugai-->
                    <div class="table-box">
                        <table class="table table-border table-bg">
                            <thead>
                                <tr>
                                    <th class="width70">{{$t('company.Qualificationname')}}</th>
                                    <th style="width:50px">{{$t('company.isqualified')}}</th>
                                    <th class="bt">{{$t('company.No')}}</th>
                                    <th class="bt">{{$t('company.validityFrom')}}</th>
                                    <th class="bt">{{$t('company.validityTo')}}</th>
                                    <th class="bt width45">{{$t('Attachment')}}</th>
                                </tr>
                            </thead>
                            <tr v-for="(qualification,index) in qualificationList">
                                <td v-text="qualification.qualType"></td>
                                <td>
                                    <el-radio-group v-model="qualification.qualIsvalid">
                                        <el-radio label="是">{{$t('company.yes')}}</el-radio>
                                        <el-radio label="否">{{$t('company.no')}}</el-radio>	
                                    </el-radio-group>
                                </td>
                                <td>
                                    <div v-if="qualification.qualIsvalid=='是'">
                                        <input type="text" class="input-text radius" :placeholder="$t('pleaseenter')" v-model="qualification.qualCode"
                                        v-validate="'required'" data-vv-as="号码" :name="'qualCode'+index"/>
                                        <span v-show="errors.has('qualCode'+index)" class="help is-danger">{{ errors.first('qualCode'+index) }}</span>
                                    </div>
                                    <input v-else type="text" style="color:#ccc" v-model="qualification.qualCode" disabled/>
                                </td>
                                <td>
                                    <div class="timeBorder"  v-if="qualification.qualIsvalid=='是'">
                                        <el-date-picker v-model="qualification.qualValidB" type="date" :placeholder="$t('Pleaseselectdate')" :clearable="false" 
                                            v-validate="'required'" data-vv-as="有效期起" :name="'qualValidB'+index" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                        <span v-show="errors.has('qualValidB'+index)" class="help is-danger">{{ errors.first('qualValidB'+index) }}</span>
                                    </div>
                                    <div class="timeBorder" v-else>
                                        <el-date-picker v-model="qualification.qualValidB" type="date" disabled value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <div class="timeBorder"  v-if="qualification.qualIsvalid=='是'">
                                        <el-date-picker v-model="qualification.qualValidE" type="date" :placeholder="$t('Pleaseselectdate')" :clearable="false" 
                                            value-format="yyyy-MM-dd HH:mm:ss"
                                        ></el-date-picker>
                                        <!-- v-validate="'required|afterDate:'+qualification.qualValidB" data-vv-as="有效期止" :name="'qualValidE'+index" -->
                                        <!-- <span v-show="errors.has('qualValidE'+index)" class="help is-danger">{{ errors.first('qualValidE'+index) }}</span> -->
                                    </div>
                                    <div class="timeBorder" v-else>
                                        <el-date-picker v-model="qualification.qualValidE" type="date" disabled value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                                    </div>
                                </td>
                                <td>
                                    <div v-if="qualification.qualIsvalid=='是'">
                                        <singleFileUpload v-if="zzxxFalse"
                                            :fileType="9" 
                                            :index="index"
                                            :fileName="qualification.doc == null ? '':qualification.doc.docName" 
                                            :serverFileName="qualification.doc == null ? '':qualification.doc.docAddress" 
                                            @success="saveFileInfo">
                                        </singleFileUpload>
                                        <input type="hidden" v-validate data-vv-rules="required" data-vv-as="附件" :name="'qualificationDoc'+index" :value="qualification.doc" >
                                        <span v-show="errors.has('qualificationDoc'+index)" class="help is-danger">{{ errors.first('qualificationDoc'+index) }}</span>
                                    </div>
                                    <div v-else>
                                        <singleFileUpload style="color:#ccc" v-if="zzxxFalse"
                                            :fileType="9" 
                                            :disabled="true" 
                                            :index="index"
                                            :fileName="qualification.doc == null ? '':qualification.doc.docName" 
                                            :serverFileName="qualification.doc == null ? '':qualification.doc.docAddress" 
                                            @success="saveFileInfo">
                                        </singleFileUpload>
                                    </div>
                                </td>
                                <!-- <td>
                                    <input v-if="qualification.qualIsvalid=='是'" type="button" class="btn btn-green radius" @click="saveQualification(index)" value="保存">
                                    <input v-else type="button" class="btn btn-green radius" style="background:#ccc;border:1px solid #ccc !important" value="保存">
                                </td> -->
                            </tr>
                        </table>
                    </div>
                </div>
            </div>

            <div class="btnsbox">
                <button class="sub" v-if="!edit" v-show="subTrue" @click="submit('2')" >{{$t('Submit')}}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import singleFileUpload from '../other/SingleFileUpload'
import qs from 'qs'
export default {
  components: {
    singleFileUpload
  },
  data() {
    return {
        showFileNamesd:true,
        zjzlFalse:true,
        zzxxFalse:true,
        contactListFalse:true,
        subTrue:true,
        company: {
            comName: '',
            comAddress: '',
            comContractB: null,
            comContractE: null,
            comBase: "基地",
            comStatus: -1,
            comId:''
        },
        certificationList: [],
        contactList: [],
        qualificationList: [],
        showComContractB: false,
        multiple: true,
        edit: false
    }
  },
  computed: {
    ...mapGetters(['RegionData', 'STATUS', 'QS_STRINGIFY_OPTIONS'])
  },
  mounted() {
    this.getData()
    this.$store.dispatch('get_REGION')
    this.VClear(1000)
    if(localStorage.getItem('get_companyId')!=null){//判断ID，全部修改
        this.edit=false
    }else{
        this.edit=true
    }
  },
  methods: {
    getData() {//初始化
        this.scrollToped()
        let _this = this
        _this.$http({
          url: '/company/getCompanyInfo',
          method: 'post',
          headers: { Authorization: localStorage.getItem('token') }
        })
        .then(res=> {//console.log(res.data.data)
            if (res.data.data != null) {
                _this.company = res.data.data.company
                _this.certificationList = res.data.data.certificationList
                _this.contactList = res.data.data.contactList            
                _this.qualificationList = res.data.data.qualificationList
            } else {
                this.edit=true
            }
            _this.showComContractB = true
            if (_this.certificationList.length < 2) {
                _this.addCertification()
            }
            if (_this.qualificationList.length < 3) {
                _this.addQualification()
            }
            this.ifContactList()//判断联系人
        })
        .catch(err=> {
          console.log(err)
        })
    },
    saveFileInfo(fileType, index, fileInfo) {//上传附件
      if (fileType == 6) {
        //公司附件
        if (this.company.doc == null) {
          this.$set(this.company, 'doc', {})
        }
        this.company.doc.docName = fileInfo.oldName
        this.company.doc.docAddress = fileInfo.newName
        this.company.doc.docId = ''
      } else if (fileType == 7) {
        // 联系人
        this.showFileNamesd=false
        setTimeout(()=>{this.showFileNamesd=true},50)
        if (this.contactList[index].doc == null) {
          let item = this.contactList[index]
          item.doc = {}
          this.$set(this.contactList, index, item)
        }
        
        this.contactList[index].doc.docName = fileInfo.oldName
        this.contactList[index].doc.docAddress = fileInfo.newName
        this.contactList[index].doc.docId = ''
      } else if (fileType == 8) {
        // 证照资料
        this.zjzlFalse=false
        setTimeout(()=>{this.zjzlFalse=true},50)
        if (this.certificationList[index].doc == null) {
          let item = this.certificationList[index]
          item.doc = {}
          this.$set(this.certificationList, index, item)
        }
        this.certificationList[index].doc.docName = fileInfo.oldName
        this.certificationList[index].doc.docAddress = fileInfo.newName
        this.certificationList[index].doc.docId = ''
      } else if (fileType == 9) {
        // 资质信息
        this.zzxxFalse=false
        setTimeout(()=>{this.zzxxFalse=true},50)
        if (this.qualificationList[index].doc == null) {
          let item = this.qualificationList[index]
          item.doc = {}
          this.$set(this.qualificationList, index, item)
        }
        this.qualificationList[index].doc.docName = fileInfo.oldName
        this.qualificationList[index].doc.docAddress = fileInfo.newName
        this.qualificationList[index].doc.docId = ''
      }
    },
    saveCompany(comStatus, flag) {//保存公司资料
      let _this = this
      let oldStatus = _this.company.comStatus
      _this.$validator.validateAll().then(result => {
        if (result) {
             _this.company.comStatus = comStatus
            this.$http({
                url: '/company/saveCompany',
                method: 'post',
                data: JSON.stringify(_this.company),
                headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: localStorage.getItem('token')
                }
            })
            .then(res => {//console.log(res)
              if (res.data.status == '100') {
                _this.company.comStatus = oldStatus
                // this.$store.commit('set_companyId', res.data.data.companyId)
                localStorage.setItem('get_companyId',res.data.data.companyId)
                this.company.comId=res.data.data.companyId
                this.edit=false
                this.$notify({
                    title: this.$t('Prompt'),
                    message: this.$t('Addsuccess'),
                    type: 'success'
                });
                //console.log(this.companyId)
              }else{
                  _this.company.comStatus = oldStatus
                  this.edit=true
                  this.$notify({
                    title: this.$t('Prompt'),
                    message: this.$t('erroperation'),//'操作失败',
                    type: 'warning'
                });
                return false
              }
            })
            .catch(err => {
                console.log(err)
              _this.company.comStatus = oldStatus
            })
        } else {
          _this.company.comStatus = oldStatus
          _this.$notify.warning({
            title: this.$t('Prompt'),
            message: this.$t('Pleaseperfecttherequireditems'),
          })
        }
      })
    },
    saveContact(index) {//保存公司联系人
      this.$confirm(this.$t('Confirm')+' '+this.$t('Save')+'?', this.$t('Prompt'), {
        confirmButtonText: this.$t('Confirm'),
        cancelButtonText: this.$t('cancel'),
      })
        .then(() => {
          this.saveContacts(index)
        })
        .catch(() => {})
    },
    saveContacts(index) {//保存公司联系人
      let _this = this
      _this.$validator.validateAll().then(result => {
        if (result) {
          let list = []
          if (index == -1) {
            list = this.contactList
          } else {
            list.push(_this.contactList[index])
          }
          this.$http({
            url: '/company/saveContactList',
            method: 'post',
            data: JSON.stringify(list),
            dataType: 'json',
            headers: {
              Authorization: localStorage.getItem('token'),
              'Content-Type': 'application/json;charset=utf-8'
            }
          }).then(res => {
            if (res.data.status == 100) {
              _this.saveCompany(_this.STATUS.SAVE, 1)
            }
            const h = _this.$createElement
            _this.$notify({
              title: this.$t('Prompt'),
              message: h('i', { style: 'color: teal' }, res.data.msg)
            })
          })
        } else {
          _this.$notify.warning({
            title: this.$t('Prompt'),
            message: this.$t('Pleaseperfecttherequireditems'),
          })
        }
      })
    },
    saveCertification(index) {//保存证件资料
      this.$confirm(this.$t('Confirm')+' '+this.$t('Save')+'?', this.$t('Prompt'), {
        confirmButtonText: this.$t('Confirm'),
        cancelButtonText: this.$t('cancel'),
      })
        .then(() => {
          this.saveCertifications(index)
        })
        .catch(() => {})
    },
    saveCertifications(index) {//保存证件资料
      let _this = this
      _this.$validator.validateAll().then(result => {
        if (result) {
          let list = []
          if (index == -1) {
            list = this.certificationList
          } else {
            list.push(_this.certificationList[index])
          }
          this.$http({
            url: '/company/saveCertificationList',
            method: 'post',
            data: JSON.stringify(list),
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            if (res.data.status == 100) {
              _this.saveCompany(_this.STATUS.SAVE, 1)
            }
            const h = _this.$createElement
            _this.$notify({
              title: this.$t('Prompt'),
              message: h('i', { style: 'color: teal' }, res.data.msg)
            })
          })
        } else {
          _this.$notify.warning({
            title: this.$t('Prompt'),
            message: this.$t('Pleaseperfecttherequireditems'),
          })
        }
      })
    },
    saveQualification(index) {//资质信息
      this.$confirm(this.$t('Confirm')+' '+this.$t('Save')+'?', this.$t('Prompt'), {
        confirmButtonText: this.$t('Confirm'),
        cancelButtonText: this.$t('cancel'),
      })
        .then(() => {
          this.saveQualificationS(index)
        })
        .catch(() => {})
    },
    saveQualificationS(index) {//资质信息
      let _this = this
      _this.$validator.validateAll().then(result => {
        if (result) {
          let list = []
          if (index == -1) {
            list = this.qualificationList
          } else {
            list.push(_this.qualificationList[index])
          }
          this.$http({
            url: '/company/saveQualificationList',
            method: 'post',
            data: JSON.stringify(list),
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
              Authorization: localStorage.getItem('token')
            }
          }).then(res => {
            if (res.data.status == 100) {
              _this.saveCompany(_this.STATUS.SAVE, 1)
            }
            const h = _this.$createElement
            _this.$notify({
              title: this.$t('Prompt'),
              message: h('i', { style: 'color: teal' }, res.data.msg)
            })
          })
        } else {
          _this.$notify.warning({
            title: this.$t('Prompt'),
            message: this.$t('Pleaseperfecttherequireditems'),
          })
        }
      })
    },
    ifContactList(){//判断联系人
        if(this.contactList.length==1){
            this.contactListFalse=false
        }else{
            this.contactListFalse=true
        }
    },
    addContact() {//新增
        let contact = {conComId:this.company.comId}
        this.contactList.push(contact)
        this.VClear(300);
        this.ifContactList()//判断联系人        
    },
    clearContact(index) {//删除
        this.$confirm(this.$t('is')+this.$t('Delete')+'?', this.$t('Prompt'), {
            confirmButtonText: this.$t('Confirm'),
            cancelButtonText: this.$t('cancel'),
        })
        .then(() => {
            let conId=this.contactList[index].conId
            if(conId==undefined){
                this.contactList.splice(index, 1);
                this.ifContactList()
                this.showFileNamesd=false
                setTimeout(()=>{this.showFileNamesd=true},50)
            }else{
                this.$http({
                    url: '/bizOrder/deleteById',
                    method: 'post',
                    data: qs.stringify({id:conId}),
                    headers: { Authorization: localStorage.getItem('token')}
                })
                .then(res=> {
                    if(res.data.status=='100'){              
                        this.$message({
                            showClose: true,
                            message: this.$t('Addsuccess'),
                            type: 'success'
                        });
                        this.contactList.splice(index, 1);
                        this.ifContactList()//判断联系人
                    }else{
                        this.$notify({
                            title: this.$t('Prompt'),
                            message:  this.$t('erroperation'),//'操作失败',
                            type: 'warning',
                        })
                        return
                    }
                    
                })
                .catch(err=> {
                    console.log(err)
                })
            }
        })
        .catch(() => {})
      
    },
    addCertification() {//证照资料
      let list = [
        { certComId: this.company.comId, certType:'营业执照'},//this.$t('company.Businesslicense')},//'营业执照'},//
        { certComId: this.company.comId, certType:'经营许可证'},//this.$t('company.CERTIFICATE')}//'经营许可证'},//
      ]
      let indexList = [0, 1]
      this.certificationList.forEach(item => {
        if (item.certType === '营业执照') {
          indexList.splice(0, 1)
        } else if (item.certType === '经营许可证') {
          indexList.splice(1, 1)
        }
      })
      indexList.forEach(item => this.certificationList.push(list[item]))
    },
    addQualification() {//资质信息
      let list = [
        { qualComId: this.company.comId, qualType: '91部',qualIsvalid:'否' },
        { qualComId: this.company.comId, qualType: '135部',qualIsvalid:'否' },
        { qualComId: this.company.comId, qualType: '145部',qualIsvalid:'否' }
      ]
      let indexList = [0, 1, 2]
      this.qualificationList.forEach(item => {
        if (item.qualType === '91部') {
          indexList.splice(0, 1)
        } else if (item.qualType === '135部') {
          indexList.splice(1, 1)
        } else if (item.qualType === '145部') {
          indexList.splice(2, 1)
        }
      })
      indexList.forEach(item => this.qualificationList.push(list[item]))
    },
    scrollToped() {//置顶
      setTimeout(() => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }, 100);
    },
    submit(comStatus) { //提交
        this.$validator.validateAll().then(result => {
            if (result) { 
                if(this.contactList.length=='0'){
                    this.$notify({
                        title: this.$t('Prompt'),
                        message: this.$t('company.Pleaseaddacompanycontact'),//'请添加公司联系人',
                        type: 'warning'
                    });
                    return
                }
                this.company.comStatus = comStatus  
                let param={
                    companyJson:this.company,
                    listContacter:JSON.stringify(this.contactList),//保存公司联系人
                    listCertification:JSON.stringify(this.certificationList),//保存证件资料
                    listQualification:JSON.stringify(this.qualificationList),//保存证件资料
                }     
                this.$http({
                    url: '/company/subCompanyInfo',
                    method: 'post',
                    data: param,// qs.stringify(param)
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: localStorage.getItem('token')
                    }
                }).then(res => {// console.log(res.data.status)
                    if(res.data.status=='100'){
                        this.subTrue=false
                        this.$notify({
                            title: this.$t('Prompt'),
                            message: this.$t('Addsuccess'),
                            type: 'success',
                            duration:2000,
                            onClose:function(){
                                location.reload(); 
                            }
                        })
                    }else{
                        this.$notify({
                            title: this.$t('Prompt'),
                            message: this.$t('erroperation'),//'操作失败',
                            type: 'warning'
                        });
                        return
                    }
                }).catch((err)=>{
                    console.log(err)
                    this.$notify({
                        title: this.$t('Prompt'),
                        message: this.$t('erroperation'),//'操作失败',
                        type: 'warning'
                    });
                })

            }else{
                this.$notify.warning({
                    title: this.$t('Prompt'),
                    message: this.$t('Pleaseperfecttherequireditems'),
                })                
            }
        })

    },
    querySearch(queryString, cb) {//所属地区
      let regionDatas = this.RegionData
      for (let i = 0; i < regionDatas.length; i++) {
        regionDatas[i].value = regionDatas[i].dicCh
      }
      let results = queryString
        ? regionDatas.filter(this.createFilter(queryString))
        : regionDatas
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter(queryString) {//所属地区
      return regionData => {
        return (
          regionData.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    },
    handleSelect(item) {}
  }
}
</script>

<style scoped>
.modGray input,
.modGray span,
.modGray textarea
{
    color:#999 !important
}
.el-button + .el-button {
  margin-left: 0px;
}
.grays {
  position: absolute;
  right: -1px;
  bottom: 44px;
  color: #666;
}
.table-border {
  margin-bottom: 0;
}
.width70 {
  /* width: 70px; */
}
.width45 {
  width: 45px;
}
.timeBorder {
  border: 1px solid #ccc;
  padding: 5px 0;
  margin-right: 6px;
}
.modGray .timeBorder,
.modGray .table-box input{
    border: 0 !important;
}
.lbox button{
    padding: 8px 15px;
}
.help {
  font-size: 12px;
  display: block;
  position: absolute;
  color: #ff3860;
}
.float-right {
  float: right;
}
.info-box3 span .el-icon-caret-right {
  line-height: 48px;
  color: #ccc;
}
a.dt_span {
  width: 80px;
  display: inline-block;
  float: left;
  overflow: hidden;
}
.el-radio + .el-radio {
  margin-left: 0px;
}
button.first {
  width: 100px;
  height: 35px;
  background: #409eff;
  color: #fff;
  border-radius: 3px;
}
button.first:hover {
  opacity: 0.8;
}
span.el-radio-button__inner {
  width: 200px !important;
  line-height: 5px !important;
  border: 1px solid #ccc !important;
}
input[type='text'] {
  width: 95%;
  padding-left: 5px;
  background: none;
}
.table input {
  text-align: center;
}
.table .el-input__inner {
  text-align: center !important;
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 90% !important;
}
.btn-green {
  /* background: #67c23a; */
  background: #f56c6c;
  color: #fff;
}
.btn-green:hover {
  opacity: 0.8;
}
input.btn.btn-green.radius,
button.btn.btn-green.radius {
  padding:0 5px;
  margin-top: 3px;
  height: 30px;
  font-size: 12px;
  border-radius: 3px;
  border: 1px solid #f56c6c !important;
}
.info-box,
.info-box2,
.info-box3 {
  display: flex;
}
.info-box .rbbq,
.info-box2 .rbbq,
.info-box3 .rbbq {
  height: 21px;
  margin-right: 10px;
}
.info-box .rbbq:last-child,
.info-box2 .rbbq:last-child,
.info-box3 .rbbq:last-child {
  margin-right: 0;
}
.rbbq1,
.rbbq2,
.rbbq4,
.rbbq5,
.rbbq6,
.rbbq7,
.rbbq8 {
  flex: 1;
}
.rbbq9 {
  flex: 2;
}
.rbbq3 {
  flex: 2;
}
.beizhu {
  font-size: 14px;
  width: 99%;
  height: 60px;
  resize: none;
  border: 0;
  background: none;
}
.table-box {
  overflow: false;
  height: auto;
}
.table-box1,
.table-box2 {
  overflow: auto;
  height: auto;
}
.table-box2 td,
.table-box2 th {
  text-align: center;
}
.table-box2 .b1 {
  color: #fff;
  background: #666;
}
.table-box2 .b2 {
  color: #ff2626;
  background: #ffcfbf;
}
.table .bt {
  color: #f39434;
}
.table .bt::before {
  content: '*';
}
.btnsbox button:hover {
  opacity: 0.8;
}
.btnsbox .modify {
  background: #409eff;
  width: 20%;
  height: 50px;
  border-radius: 3px;
  color: #fff;
  line-height: 50px;
}
.btnsbox .sub {
  background: #67c23a;
  width: 20%;
  height: 50px;
  border-radius: 3px;
  color: #fff;
  line-height: 50px;
}
.table-box input {
  border: 1px solid #ccc !important;
  padding: 6px;
  width: 85%;
}
.rbbq .cen label {
  width: 100% !important;
  float: left;
}
.rbbq .cen label.el-radio-button {
  width: auto !important;
  float: left;
}
input.el-radio-button__orig-radio {
  line-height: 0 !important;
}

.upLoad {
  background: #f39434;
  border-radius: 2px;
  color: #fff;
  font-size: 12px;
  position: relative;
  padding: 1px 10px 2px 10px;
}
.upLoad input {
  opacity: 0;
  width: 100%;
  position: absolute;
  right: 0;
  top: 0;
}
span.dt_span {
  width: 44% !important;
}
.el-radio.is-bordered {
  padding: 5px 5px 0 5px;
  height: 25px;
}
.dateStyleCenter{
    min-height:125px
}
</style>

