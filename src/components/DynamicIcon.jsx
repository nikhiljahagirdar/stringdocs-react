import React from 'react';
import * as FaIcons from 'react-icons/fa';      // FontAwesome icons
import * as Fa6Icons from 'react-icons/fa6';    // FontAwesome v6 icons
import * as MdIcons from 'react-icons/md';      // Material Design icons
import * as BsIcons from 'react-icons/bs';      // Bootstrap icons
import * as AiIcons from 'react-icons/ai';      // Ant Design icons
import * as IoIcons from 'react-icons/io';      // Ionicons
import * as Io5Icons from 'react-icons/io5';    // Ionicons v5
import * as GiIcons from 'react-icons/gi';      // Game Icons
import * as FiIcons from 'react-icons/fi';      // Feather Icons
import * as RiIcons from 'react-icons/ri';      // Remix Icons
import * as TbIcons from 'react-icons/tb';      // Tabler Icons
import * as CgIcons from 'react-icons/cg';      // CSS.gg Icons
import * as HiIcons from 'react-icons/hi';      // HeroIcons
import * as Hi2Icons from 'react-icons/hi2';    // HeroIcons v2
import * as LuIcons from 'react-icons/lu';      // Lucide Icons
import * as PiIcons from 'react-icons/pi';      // Phosphor Icons
import * as TfiIcons from 'react-icons/tfi';    // Themify Icons
import * as VscIcons from 'react-icons/vsc';    // VS Code Icons
import PropTypes from 'prop-types';

const iconLibraries = {
  Fa: FaIcons,
  Fa6: Fa6Icons,
  Md: MdIcons,
  Bs: BsIcons,
  Ai: AiIcons,
  Io: IoIcons,
  Io5: Io5Icons,
  Gi: GiIcons,
  Fi: FiIcons,
  Ri: RiIcons,
  Tb: TbIcons,
  Cg: CgIcons,
  Hi: HiIcons,
  Hi2: Hi2Icons,
  Lu: LuIcons,
  Pi: PiIcons,
  Tfi: TfiIcons,
  Vsc: VscIcons,
};

const DynamicIcon = ({ iconName, color='text-white' , size = '1em' }) => {
  if (!iconName) return null;

  const icon2Lib=iconName.substring(0, 2);

   if(icon2Lib==='Fa' ){
    const IconComponent = FaIcons[iconName]
       return IconComponent ? <IconComponent color={color} size={size}  /> : ''
   }
 
};

DynamicIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
  className: PropTypes.string,
  size: PropTypes.string,
};

export default DynamicIcon;
